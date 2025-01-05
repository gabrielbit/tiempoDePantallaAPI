/*
  Warnings:

  - You are about to drop the column `childId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_childId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "childId";

-- CreateTable
CREATE TABLE "ChildOnSchedule" (
    "childId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "ChildOnSchedule_pkey" PRIMARY KEY ("childId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "ChildOnSchedule" ADD CONSTRAINT "ChildOnSchedule_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildOnSchedule" ADD CONSTRAINT "ChildOnSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
