/*
  Warnings:

  - The values [A_POSITIVIE,B_POSITIVIE,O_POSITIVIE,AB_POSITIVIE] on the enum `BloodGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodGroup_new" AS ENUM ('A_POSITIVE', 'B_POSITIVE', 'O_POSITIVE', 'AB_POSITIVE', 'A_NEGATIVE', 'B_NEGATIVE', 'O_NEGATIVE', 'AB_NEGATIVE');
ALTER TABLE "patient_health_datas" ALTER COLUMN "bloodGroup" TYPE "BloodGroup_new" USING ("bloodGroup"::text::"BloodGroup_new");
ALTER TYPE "BloodGroup" RENAME TO "BloodGroup_old";
ALTER TYPE "BloodGroup_new" RENAME TO "BloodGroup";
DROP TYPE "BloodGroup_old";
COMMIT;
