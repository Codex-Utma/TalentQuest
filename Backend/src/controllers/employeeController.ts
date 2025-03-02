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
            }
        });

        if(course === null) {
            return returnResponse(res, 404, "Curso no encontrado");
        }

        const courseData = {
            id: course.id,
            name: course.name,
            description: course.description,
            classes: course.totalClasses
        };

        return returnResponse(res, 200, "Curso encontrado", courseData);

    } catch (error) {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

export {
    login,
    getCourseDetails
}
