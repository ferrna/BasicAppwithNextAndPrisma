/*
  Warnings:

  - You are about to drop the column `isActive` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `registerDate` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isActive`,
    DROP COLUMN `registerDate`;
