/*
  Warnings:

  - The primary key for the `chata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `chata` table. All the data in the column will be lost.
  - You are about to drop the column `id_chata` on the `documento_chata` table. All the data in the column will be lost.
  - You are about to drop the column `id_chata` on the `mantenimiento` table. All the data in the column will be lost.
  - You are about to drop the column `id_chata` on the `vehiculo` table. All the data in the column will be lost.
  - Made the column `chasis` on table `chata` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "documento_chata" DROP CONSTRAINT "documento_chata_id_chata_fkey";

-- DropForeignKey
ALTER TABLE "mantenimiento" DROP CONSTRAINT "mantenimiento_chata_fkey";

-- DropForeignKey
ALTER TABLE "vehiculo" DROP CONSTRAINT "vehiculo_id_chata_fkey";

-- AlterTable
ALTER TABLE "chata" DROP CONSTRAINT "chata_pkey",
DROP COLUMN "id",
ADD COLUMN     "capacidad" TEXT,
ADD COLUMN     "foto" TEXT,
ALTER COLUMN "chasis" SET NOT NULL,
ADD CONSTRAINT "chata_pkey" PRIMARY KEY ("chasis");

-- AlterTable
ALTER TABLE "documento_chata" DROP COLUMN "id_chata",
ADD COLUMN     "chasis_chata" TEXT;

-- AlterTable
ALTER TABLE "mantenimiento" DROP COLUMN "id_chata",
ADD COLUMN     "chasis_chata" TEXT;

-- AlterTable
ALTER TABLE "vehiculo" DROP COLUMN "id_chata",
ADD COLUMN     "chasis_chata" TEXT;

-- CreateIndex
CREATE INDEX "documento_chata_chasis_chata_idx" ON "documento_chata"("chasis_chata");

-- CreateIndex
CREATE INDEX "mantenimiento_chasis_chata_idx" ON "mantenimiento"("chasis_chata");

-- CreateIndex
CREATE INDEX "vehiculo_chasis_chata_idx" ON "vehiculo"("chasis_chata");

-- AddForeignKey
ALTER TABLE "documento_chata" ADD CONSTRAINT "documento_chata_chasis_chata_fkey" FOREIGN KEY ("chasis_chata") REFERENCES "chata"("chasis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mantenimiento" ADD CONSTRAINT "mantenimiento_chata_fkey" FOREIGN KEY ("chasis_chata") REFERENCES "chata"("chasis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculo" ADD CONSTRAINT "vehiculo_chasis_chata_fkey" FOREIGN KEY ("chasis_chata") REFERENCES "chata"("chasis") ON DELETE SET NULL ON UPDATE CASCADE;
