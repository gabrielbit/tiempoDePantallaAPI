-- Limpiar las tablas existentes
TRUNCATE TABLE "TaskOnSchedule", "ChildOnSchedule", "Schedule", "Task", "Child", "User" CASCADE;

-- Insertar un usuario padre
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'usr_01',
  'padre@example.com',
  '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', -- password: 123456
  'Juan Padre',
  'PARENT',
  NOW(),
  NOW()
);

-- Insertar un niño
INSERT INTO "Child" (id, name, age, "screenTimeLimit", "screenTimeUsed", "parentId", "createdAt", "updatedAt")
VALUES (
  'chd_01',
  'Salvador',
  8,
  120,
  0,
  'usr_01',
  NOW(),
  NOW()
);

-- Insertar algunas tareas con IDs de íconos correctos
INSERT INTO "Task" (id, name, description, icon, "isRequired", "createdAt", "updatedAt")
VALUES 
  ('tsk_01', 'Tarea escolar', 'Completar las tareas del colegio', 'homework', true, NOW(), NOW()),
  ('tsk_02', 'Ordenar la habitación', 'Dejar todo en su lugar', 'room', true, NOW(), NOW()),
  ('tsk_03', 'Jugar videojuegos', 'Tiempo de diversión', 'gaming', false, NOW(), NOW());

-- Insertar un horario de prueba
INSERT INTO "Schedule" (id, name, "startTime", "endTime", "recommendedDuration", "isActive", "appliedToAll", "createdAt", "updatedAt")
VALUES (
  'sch_01',
  'Horario de Tarde',
  '14:00',
  '18:00',
  240,
  true,
  false,
  NOW(),
  NOW()
);

-- Asociar el horario con el niño
INSERT INTO "ChildOnSchedule" ("childId", "scheduleId")
VALUES ('chd_01', 'sch_01');

-- Asociar tareas al horario
INSERT INTO "TaskOnSchedule" ("taskId", "scheduleId")
VALUES 
  ('tsk_01', 'sch_01'),
  ('tsk_02', 'sch_01'),
  ('tsk_03', 'sch_01'); 