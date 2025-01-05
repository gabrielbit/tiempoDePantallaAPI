/*
  Warnings:

  - You are about to drop the column `status` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `TaskCompletion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'SKIPPED');

-- DropForeignKey
ALTER TABLE "TaskCompletion" DROP CONSTRAINT "TaskCompletion_childId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCompletion" DROP CONSTRAINT "TaskCompletion_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCompletion" DROP CONSTRAINT "TaskCompletion_taskId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "status",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "TaskCompletion";

-- CreateTable
CREATE TABLE "ScheduleInstance" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "status" "ScheduleStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "screenTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskState" (
    "id" TEXT NOT NULL,
    "scheduleInstanceId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "completedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleInstance_date_scheduleId_childId_key" ON "ScheduleInstance"("date", "scheduleId", "childId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskState_scheduleInstanceId_taskId_key" ON "TaskState"("scheduleInstanceId", "taskId");

-- AddForeignKey
ALTER TABLE "ScheduleInstance" ADD CONSTRAINT "ScheduleInstance_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleInstance" ADD CONSTRAINT "ScheduleInstance_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskState" ADD CONSTRAINT "TaskState_scheduleInstanceId_fkey" FOREIGN KEY ("scheduleInstanceId") REFERENCES "ScheduleInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskState" ADD CONSTRAINT "TaskState_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
