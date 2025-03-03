import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import returnResponse from "../utils/auto/response";

const prisma = new PrismaClient();

const getUsersStats = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                userType: {
                    name: "employee"
                }
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                course: {
                    select: {
                        name: true
                    }
                },
                percentageCompleted: true
            }
        });

        if (users.length === 0) {
            return returnResponse(res, 404, "No se encontraron usuarios");
        }

        return returnResponse(res, 200, "Usuarios encontrados", users);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const createCourse = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return returnResponse(res, 400, "Todos los campos son obligatorios");
        }

        const course = await prisma.course.create({
            data: {
                name,
                description,
                totalClasses: 0
            }
        });

        return returnResponse(res, 201, "Curso creado correctamente", course);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const createModule = async (req: Request, res: Response) => {
    try {
        const courseId = Number(req.params.courseId);

        if (!courseId) {
            return returnResponse(res, 400, "El id del curso es obligatorio");
        }

        const { name, description } = req.body;

        if (!name || !description) {
            return returnResponse(res, 400, "Todos los campos son obligatorios");
        }

        const course = await prisma.course.findFirst({
            where: {
                id: courseId
            }
        });

        if (course === null) {
            return returnResponse(res, 404, "El curso no existe");
        }

        const module = await prisma.module.create({
            data: {
                name,
                description,
                idCourse: courseId
            }
        });

        return returnResponse(res, 201, "Módulo creado correctamente", module);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const createClass = async (req: Request, res: Response) => {
    try {
        const moduleId = Number(req.params.moduleId);

        if (!moduleId) {
            return returnResponse(res, 400, "El id del módulo es obligatorio");
        }

        const { name, description } = req.body;

        if (!name || !description) {
            return returnResponse(res, 400, "Todos los campos son obligatorios");
        }

        const module = await prisma.module.findFirst({
            where: {
                id: moduleId
            }
        });

        if (module === null) {
            return returnResponse(res, 404, "El módulo no existe");
        }

        const course = await prisma.course.findFirst({
            where: {
                id: module.idCourse
            }
        });

        if (course === null) {
            return returnResponse(res, 404, "El curso no existe");
        }

        const newClass = await prisma.class.create({
            data: {
                name,
                description,
                idModule: moduleId
            }
        });

        await prisma.course.update({
            where: {
                id: course.id
            },
            data: {
                totalClasses: {
                    increment: 1
                }
            }
        });

        return returnResponse(res, 201, "Clase creada correctamente", newClass);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getGeneralStats = async (req: Request, res: Response) => {
    try {
        const totalCourses = await prisma.course.count();
        const totalUsers = await prisma.user.count({
            where: {
                userType: {
                    name: "employee"
                }
            }
        });

        const finishedCourses = await prisma.user.count({
            where: {
                userType: {
                    name: "employee"
                },
                percentageCompleted: 100
            }
        });

        const finalizationPercentage = (finishedCourses / totalUsers) * 100;

        return returnResponse(res, 200, "Estadísticas generales", {
            totalCourses,
            totalUsers,
            finishedCourses,
            finalizationPercentage
        });
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, password, courseId } = req.body;

        if (!name || !lastName || !email || !password || !courseId) {
            return returnResponse(res, 400, "Todos los campos son obligatorios");
        }

        const course = await prisma.course.findFirst({
            where: {
                id: courseId
            }
        });

        if (course === null) {
            return returnResponse(res, 404, "El curso no existe");
        }

         await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password: await bcrypt.hash(password, Number(process.env.BCRYPT_SALT) || 10),
                idCourse: courseId,
                idUserType: 2,
                percentageCompleted: 0
            }
        });

        return returnResponse(res, 201, "Usuario registrado correctamente");
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getCourses = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        const courseName = req.query.courseName as string;

        if (!courseName) {
            return returnResponse(res, 400, "El nombre del curso es obligatorio");
        }

        const courses = await prisma.course.findMany({
            where: {
                name: {
                    contains: courseName
                }
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        if (courses.length === 0) {
            return returnResponse(res, 404, "No se encontraron cursos");
        }

        return returnResponse(res, 200, "Cursos encontrados", courses);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

export {
    getUsersStats,
    createCourse,
    createModule,
    createClass,
    getGeneralStats,
    register,
    getCourses
}
