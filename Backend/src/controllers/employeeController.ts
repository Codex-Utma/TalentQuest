import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import generateJWT from "../utils/helpers/generateJWT";

import returnResponse from "../utils/auto/response";

const prisma = new PrismaClient();

const Login = async (req: Request, res: Response) => {
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

export {
    Login
}
