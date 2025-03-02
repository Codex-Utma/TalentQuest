import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    try {
        await prisma.userType.createMany({
            data: [
                {
                    name: "Admin",
                    description: "Administrador del sistema"
                },
                {
                    name: "Employee",
                    description: "Empleado (accede a cursos)"
                }
            ]
        });

        await prisma.course.createMany({
            data: [
                {
                    name: "Curso de programación",
                    description: "Curso de programación en JavaScript",
                    totalClasses: 10,
                },
                {
                    name: "Curso de diseño",
                    description: "Curso de diseño gráfico",
                    totalClasses: 5,
                }
            ]
        });

        await prisma.user.createMany({
            data: [
                {
                    name: "Admin",
                    lastName: "Admin",
                    email: "admin@example.com",
                    idUserType: 1,
                    password: "$2a$12$4jRy3mRA3kQGb3S7CXFP8.2t2BBEcTU4VuPCml9buycBwiKXzRat."
                },
                {
                    name: "Employee",
                    lastName: "Employee",
                    email: "employee@example.com",
                    idUserType: 2,
                    password: "$2a$12$wVDsxScY8Ac0i4J.4W9qx.rpAHu12K9J49XYPa8x4aAElxsLfff0."
                }
            ]
        });
    } catch {
        throw new Error("Error al ejecutar el seed");
    }
}

const seedModules = async () => {
    try {
        await prisma.module.createMany({
            data: [
                { name: "Introducción al curso", description: "Descripción del módulo de introducción.", idCourse: 1 },
                { name: "Fundamentos básicos", description: "Descripción de los fundamentos básicos.", idCourse: 1 },
                { name: "Conceptos intermedios", description: "Explicación de conceptos de nivel intermedio.", idCourse: 1 },
                { name: "Aplicaciones prácticas", description: "Ejercicios y aplicaciones del curso.", idCourse: 1 },
                { name: "Casos de estudio", description: "Análisis de casos reales.", idCourse: 1 },
                { name: "Evaluación y pruebas", description: "Pruebas de conocimiento y evaluaciones.", idCourse: 1 },
                { name: "Conclusión y cierre", description: "Resumen y cierre del curso.", idCourse: 1 }
            ]
        });
    } catch {
        throw new Error("Error al ejecutar el seed");
    }
}

const seedClasses = async () => {
    try {
        await prisma.class.createMany({
            data: [
                { name: "Clase 1", description: "Descripción de la clase 1.", idModule: 1 },
                { name: "Clase 2", description: "Descripción de la clase 2.", idModule: 1 },
                { name: "Clase 3", description: "Descripción de la clase 3.", idModule: 1 },
                { name: "Clase 4", description: "Descripción de la clase 4.", idModule: 1 },
                { name: "Clase 5", description: "Descripción de la clase 5.", idModule: 1 }
            ]
        });
    } catch {
        throw new Error("Error al ejecutar el seed");
    }
}

try {
    // seed();
    // seedModules();
    // console.log("Seed ejecutado correctamente");
    // seedClasses();
    console.log('No hay seed´s para ejecutar');
} catch {
    throw new Error("Error al ejecutar el seed");
}
