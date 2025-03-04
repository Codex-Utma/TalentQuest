import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import returnResponse from "../utils/auto/response";
import createGptPrompt from "../utils/auto/gptPrompt";
import openai from "../utils/helpers/openaiSetup";

import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

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

        if(course === null) {
            return returnResponse(res, 404, "Curso no encontrado");
        }

        const userPercentage = await prisma.user.findFirst({
            where: {
                id: user.id
            },
            select: {
                percentageCompleted: true
            }
        });

        const courseData = {
            id: course.id,
            name: course.name,
            description: course.description,
            classes: course.totalClasses,
            percentage: userPercentage?.percentageCompleted
        };

        return returnResponse(res, 200, "Curso encontrado", courseData);

    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getModules = async (req: Request, res: Response) => {
    try {
        const courseId = Number(req.body.user.idCourse);

        if(isNaN(courseId)) {
            return returnResponse(res, 400, "El id del curso debe ser un número");
        }

        const course = await prisma.course.findFirst({
            where: {
                id: courseId
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        if(course === null) {
            return returnResponse(res, 404, "Curso no encontrado");
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

        const response = {
            course: {
                id: course.id,
                name: course.name,
                description: course.description
            },
            modules
        }

        return returnResponse(res, 200, "Módulos encontrados", response);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getClasses = async (req: Request, res: Response) => {
    try {
        const moduleId = Number(req.params.moduleId);

        if(isNaN(moduleId)) {
            return returnResponse(res, 400, "El id del módulo debe ser un número");
        }

        const module = await prisma.module.findFirst({
            where: {
                id: moduleId
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        if(module === null) {
            return returnResponse(res, 404, "Módulo no encontrado");
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

        const response = {
            module: {
                id: module.id,
                name: module.name,
                description: module.description
            },
            classes
        }

        return returnResponse(res, 200, "Clases encontradas", response);
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
            return returnResponse(res, 200, "Clase ya completada");
        }

        await prisma.classAdvance.create({
            data: {
                idUser: userId,
                idClass: classId
            }
        });

        const classesCompleted = await prisma.classAdvance.count({
            where: {
                AND: [
                    {
                        idUser: userId
                    },
                    {
                        user: {
                            idCourse: Number(req.body.user.idCourse)
                        }
                    }
                ]
            }
        });

        const totalClasses = await prisma.course.findFirst({
            where: {
                id: Number(req.body.user.idCourse)
            },
            select: {
                totalClasses: true
            }
        });

        if(totalClasses === null) {
            return returnResponse(res, 404, "Curso no encontrado");
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                percentageCompleted: (classesCompleted / totalClasses.totalClasses) * 100
            }
        })

        return returnResponse(res, 200, "Clase completada");
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getResponse = async (req: Request, res: Response) => {
    try {

        const courseId = Number(req.body.user.idCourse);
        const moduleId = Number(req.params.moduleId);
        const classId = Number(req.params.classId);

        const question = req.body.question;

        if(!question) {
            return returnResponse(res, 400, "La pregunta es obligatoria");
        }

        if(isNaN(courseId) || isNaN(moduleId) || isNaN(classId)) {
            return returnResponse(res, 400, "El id del curso, módulo y clase deben ser números");
        }

        const courseData = await prisma.course.findFirst({
            where: {
                id: courseId
            },
            select: {
                name: true
            }
        });

        if(courseData === null) {
            return returnResponse(res, 404, "Curso no encontrado");
        }

        const moduleData = await prisma.module.findFirst({
            where: {
                AND: [
                    {
                        id: moduleId
                    },
                    {
                        idCourse: courseId
                    }
                ]
            },
            select: {
                name: true,
            }
        });

        if(moduleData === null) {
            return returnResponse(res, 404, "Módulo no encontrado");
        }

        const classData = await prisma.class.findFirst({
            where: {
                AND: [
                    {
                        id: classId
                    },
                    {
                        idModule: moduleId
                    }
                ]
            },
            select: {
                name: true
            }
        });

        if(classData === null) {
            return returnResponse(res, 404, "Clase no encontrada");
        }

        const prompt = createGptPrompt(courseData.name, moduleData.name, classData.name, question);

        let gptResponse;

        try {
            gptResponse = await openai.chat.completions.create({
                model: "text-moderation-latest",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
            });
        } catch (error: any) {
            return returnResponse(res, error.status, error.message);
        }

        const response = gptResponse.choices[0].message.content;

        return returnResponse(res, 200, "Respuesta encontrada", response);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getResource = async (req: Request, res: Response) => {
    try {
        const classId = Number(req.params.classId);

        if(isNaN(classId)) {
            return returnResponse(res, 400, "El id de la clase debe ser un número");
        }

        const resourceExists = await prisma.resource.findFirst({
            where: {
                idClass: classId
            },
            select: {
                link: true
            }
        });

        if(resourceExists === null) {
            return returnResponse(res, 404, "Recurso no encontrado");
        }

        const uploadsDir = path.join(__dirname, "../..");
        const file = path.join(uploadsDir, resourceExists.link);

        if (!fs.existsSync(file)) {
            return returnResponse(res, 404, "El archivo no existe en el servidor");
        }

        res.download(file, (err) => {
            if (err) {
                return returnResponse(res, 500, "Error al descargar el archivo");
            }
        });
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

const getVideo = async (req: Request, res: Response) => {
    try {
        const classId = Number(req.params.classId);

        if(isNaN(classId)) {
            return returnResponse(res, 400, "El id de la clase debe ser un número");
        }

        const video = await prisma.resource.findFirst({
            where: {
                AND: [
                    {
                        idClass: classId
                    },
                    {
                        resourceType: {
                            description: "mp4"
                        }
                    }
                ]
            },
            select: {
                link: true
            }
        });

        if(video === null) {
            return returnResponse(res, 404, "Video no encontrado");
        }

        return returnResponse(res, 200, "Video encontrado", video.link);
    } catch {
        return returnResponse(res, 500, "Error interno del servidor");
    }
}

export {
    getCourseDetails,
    getModules,
    getClasses,
    addClassCompleted,
    getResponse,
    getResource,
    getVideo
}
