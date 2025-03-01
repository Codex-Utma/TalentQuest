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

try {
    seed();
    console.log("Seed ejecutado correctamente");
} catch {
    throw new Error("Error al ejecutar el seed");
}
