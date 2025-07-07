import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Seeding database...');

  // Crear usuarios
  const admin = await prisma.user.create({
    data: {
      rut: '11111111-1',
      email: 'admin@uta.cl',
      password: '$2b$10$BtRB1t1QcY0jz32Luls4VObuch9HnPdociyfxlJ6Im4KwUo3Iiiii',
      fullName: 'Admin User',
      role: 'ADMIN',
    },
  });

  const teacher = await prisma.user.create({
    data: {
      rut: '14709010-2',
      email: 'profesor@uta.cl',
      password: '$2b$10$BtRB1t1QcY0jz32Luls4VObuch9HnPdociyfxlJ6Im4KwUo3Iiiii',
      fullName: 'María Soto',
      role: 'TEACHER',
    },
  });

  const student1 = await prisma.user.create({
    data: {
      rut: '20503853-1',
      email: 'leandro@uta.cl',
      password: '$2b$10$BtRB1t1QcY0jz32Luls4VObuch9HnPdociyfxlJ6Im4KwUo3Iiiii',
      fullName: 'Leandro Molina',
      role: 'STUDENT',
    },
  });

  const student2 = await prisma.user.create({
    data: {
      rut: '20501853-1',
      email: 'fernanda@uta.cl',
      password: '$2b$10$BtRB1t1QcY0jz32Luls4VObuch9HnPdociyfxlJ6Im4KwUo3Iiiii',
      fullName: 'Fernanda Ventura',
      role: 'STUDENT',
    },
  });

  // Crear curso
  const course = await prisma.course.create({
    data: {
      code: 'INF-301',
      name: 'Aplicaciones Distribuidas',
      semester: '2025-1',
      teacher: { connect: { id: teacher.id } },
      students: {
        connect: [{ id: student1.id }, { id: student2.id }],
      },
    },
  });

  // Crear clases
  const classes = await Promise.all(
    Array.from({ length: 3 }).map((_, i) =>
      prisma.class.create({
        data: {
          title: `Clase ${i + 1}: Tema ${i + 1}`,
          date: faker.date.recent({ days: 10 }),
          courseId: course.id,
        },
      }),
    ),
  );

  // Crear asistencia por clase y estudiante
  for (const cls of classes) {
    for (const student of [student1, student2]) {
      await prisma.attendance.create({
        data: {
          status: faker.helpers.arrayElement(['PRESENT', 'ABSENT']),
          classId: cls.id,
          studentId: student.id,
        },
      });
    }
  }

  // Recursos por clase
  for (const cls of classes) {
    await prisma.resource.create({
      data: {
        name: `Recurso para ${cls.title}`,
        url: `https://recursos.uta.cl/${cls.id}.pdf`,
        classId: cls.id,
      },
    });
  }

  // Evaluación
  const evaluation = await prisma.evaluation.create({
    data: {
      title: 'Evaluación 1',
      date: faker.date.soon({ days: 5 }),
      courseId: course.id,
    },
  });

  // Submissions de estudiantes
  for (const student of [student1, student2]) {
    await prisma.submission.create({
      data: {
        studentId: student.id,
        evaluationId: evaluation.id,
        fileUrl: `https://entregas.uta.cl/${student.id}.pdf`,
        grade: parseFloat(faker.number.float({ min: 4, max: 7 }).toFixed(1)),
      },
    });
  }

  console.log('✅ Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
