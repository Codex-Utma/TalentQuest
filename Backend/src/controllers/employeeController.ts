import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import generateJWT from "../utils/helpers/generateJWT";

import returnResponse from "../utils/auto/response";

const prisma = new PrismaClient();

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return returnResponse(res, 400, "Todos los campos son obligatorios");
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                password: true,
                id: true,
                name: true,
                lastName: true,
                userType: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (user === null) {
            return returnResponse(res, 404, "El usuario no existe");
        }

        const userType: string = user.userType.name;

        if(userType.toLowerCase() !== "employee") {
            return returnResponse(res, 401, "No tienes permiso para acceder a esta ruta");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return returnResponse(res, 401, "Contraseña incorrecta");
        }

        const token = generateJWT(Number(user.id), user.name, user.lastName, 'employee');

        return returnResponse(res, 200, "Usuario logueado correctamente", token);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getCourseDetails = async (req: Request, res: Response) => {
    try {
        const user = req.body.user;

        const courseId = user.idCourse;

        if(courseId === null) {
            return returnResponse(res, 404, "El usuario no tiene un curso asignado");
        }

        const course = await prisma.course.findFirst({
            where: {
                id: courseId
            },
            select: {
                id: true,
                name: true,
                description: true,
                totalClasses: true
            }
        });

        const advancedClasses = await prisma.classAdvance.count({
            where: {
                AND: [
                    {
                        idUser: user.id
                    },
                    {
                        user: {
                            idCourse: courseId
                        }
                    }
                ]
            }
        });

        if(advancedClasses === course?.totalClasses) {
            return returnResponse(res, 200, "Curso completado", { completed: true });
        }

        if(course === null) {
            return returnResponse(res, 404, "Curso no encontrado");
        }

        const courseData = {
            id: course.id,
            name: course.name,
            description: course.description,
            classes: course.totalClasses,
            percentage: `${(advancedClasses / course.totalClasses) * 100}%`
        };

        return returnResponse(res, 200, "Curso encontrado", courseData);

    } catch (error) {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getModules = async (req: Request, res: Response) => {
    try {
        const courseId = Number(req.body.user.idCourse);

        if(isNaN(courseId)) {
            return returnResponse(res, 400, "El id del curso debe ser un número");
        }

        const modules = await prisma.module.findMany({
            where: {
                idCourse: courseId
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        if(modules.length === 0) {
            return returnResponse(res, 404, "No se encontraron módulos para el curso");
        }

        return returnResponse(res, 200, "Módulos encontrados", modules);
    } catch (error) {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getClasses = async (req: Request, res: Response) => {
    try {
        const moduleId = Number(req.params.moduleId);

        if(isNaN(moduleId)) {
            return returnResponse(res, 400, "El id del módulo debe ser un número");
        }

        const classes = await prisma.class.findMany({
            where: {
                idModule: moduleId
            },
            select: {
                id: true,
                name: true,
                description: true,
            }
        });

        if(classes.length === 0) {
            return returnResponse(res, 404, "No se encontraron clases para el módulo");
        }

        return returnResponse(res, 200, "Clases encontradas", classes);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const addClassCompleted = async (req: Request, res: Response) => {
    try {
        const classId = Number(req.params.classId);

        if(isNaN(classId)) {
            return returnResponse(res, 400, "El id de la clase debe ser un número");
        }

        const userId = Number(req.body.user.id);

        const classCompleted = await prisma.classAdvance.findFirst({
            where: {
                AND: [
                    {
                        idUser: userId
                    },
                    {
                        idClass: classId
                    }
                ]
            }
        });

        if(classCompleted !== null) {
            return returnResponse(res, 400, "La clase ya ha sido completada");
        }

        await prisma.classAdvance.create({
            data: {
                idUser: userId,
                idClass: classId
            }
        });

        return returnResponse(res, 200, "Clase completada");
    } catch (error) {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

export {
    login,
    getCourseDetails,
    getModules,
    getClasses,
    addClassCompleted
}
