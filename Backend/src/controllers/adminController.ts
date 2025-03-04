import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import returnResponse from "../utils/auto/response";
import fileUpload from "express-fileupload";

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

const getModules = async (req: Request, res: Response) => {
    try {
        const courseId = Number(req.params.courseId);

        if (isNaN(courseId)) {
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

        if (course === null) {
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

        if (modules.length === 0) {
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

        if (isNaN(moduleId)) {
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

        if (module === null) {
            return returnResponse(res, 404, "Módulo no encontrado");
        }

        const classes = await prisma.class.findMany({
            where: {
                idModule: moduleId
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        });

        if (classes.length === 0) {
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

const addResource = async (req: Request, res: Response) => {
    try {
        if (req.files === null || req.files === undefined) {
            return returnResponse(res, 400, "No se encontraron archivos");
        }

        const file = req.files.resource as fileUpload.UploadedFile;

        const fileType = file.name.split('.').pop();

        const validFileType = await prisma.resourceType.findFirst({
            where: {
                description: fileType
            },
            select: {
                id: true
            }
        });

        if (validFileType === null) {
            return returnResponse(res, 400, "Tipo de archivo no permitido");
        }

        const fileName = file.name;

        if (!file) {
            return returnResponse(res, 400, "El archivo es obligatorio");
        }

        const { classId, moduleId, courseId } = req.params;

        if (!classId || !moduleId || !courseId) {
            return returnResponse(res, 400, "Todos los campos son obligatorios");
        }

        const module = await prisma.module.findFirst({
            where: {
                id: Number(moduleId)
            },
            select: {
                id: true
            }
        });

        if (module === null) {
            return returnResponse(res, 404, "El módulo no existe");
        }

        const course = await prisma.course.findFirst({
            where: {
                id: Number(courseId)
            },
            select: {
                id: true
            }
        });

        if (course === null) {
            return returnResponse(res, 404, "El curso no existe");
        }

        const classExist = await prisma.class.findFirst({
            where: {
                id: Number(classId)
            },
            select: {
                id: true
            }
        });

        if (!classExist) {
            return returnResponse(res, 404, "La clase no existe");
        }

        await file.mv(__dirname + '/../../uploads/' + courseId + '/' + moduleId + '/' + classId + '/' + fileName);

        await prisma.resource.create({
            data: {
                name: fileName,
                link: './uploads/' + courseId + '/' + moduleId + '/' + classId + '/' + fileName,
                idClass: Number(classId),
                idResourceType: validFileType.id
            }
        });

        return returnResponse(res, 200, "Recurso agregado correctamente");
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
    getCourses,
    getModules,
    getClasses,
    addResource
}
