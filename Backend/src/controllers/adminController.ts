import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import returnResponse from "../utils/auto/response";
import generateJWT from "../utils/helpers/generateJWT";

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

        if(userType.toLowerCase() !== "admin") {
            return returnResponse(res, 401, "No tienes permiso para acceder a esta ruta");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return returnResponse(res, 401, "Contraseña incorrecta");
        }

        const token = generateJWT(Number(user.id), user.name, user.lastName, 'admin');

        return returnResponse(res, 200, "Usuario logueado correctamente", token);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getStats = async (req: Request, res: Response) => {
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

export {
    login,
    getStats
}
