/*
  Warnings:

  - Added the required column `featuredImg` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "featuredImg" TEXT NOT NULL;
