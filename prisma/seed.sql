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

-- Insertar algunas tareas
INSERT INTO "Task" (id, name, description, icon, "isRequired", "createdAt", "updatedAt")
VALUES 
  ('tsk_01', 'Hacer la tarea', 'Completar las tareas escolares', '📚', true, NOW(), NOW()),
  ('tsk_02', 'Ordenar la habitación', 'Dejar todo en su lugar', '🏠', true, NOW(), NOW()),
  ('tsk_03', 'Jugar videojuegos', 'Tiempo de diversión', '🎮', false, NOW(), NOW()); 