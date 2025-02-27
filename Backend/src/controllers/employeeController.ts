import { Request, Response } from "express";
import bcrypt from "bcrypt";

import prisma from "@prisma/client";
import generateJWT from "../utils/helpers/generateJWT";

const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
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
            return res.status(404).json({ message: "El usuario no existe" });
        }

        if(user.userType.name !== "employee") {
            return res.status(401).json({ message: "No tienes permiso para acceder a esta ruta" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = generateJWT(Number(user.id), user.name, user.lastName, 'employee');

        return res.status(200).json({ message: "Usuario logueado correctamente", token });
    } catch {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export {
    Login
}
