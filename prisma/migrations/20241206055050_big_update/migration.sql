-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "profileImage" TEXT NOT NULL,
    "cif" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "allDay" BOOLEAN NOT NULL,
    "timeFormat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carga" (
    "id" SERIAL NOT NULL,
    "id_viaje" INTEGER,
    "id_cliente" INTEGER,
    "peso_carga" DECIMAL(10,2) NOT NULL,
    "descripcion_carga" TEXT,
    "destino" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chata" (
    "id" SERIAL NOT NULL,
    "chasis" TEXT,
    "tipo_chata" TEXT,
    "estado" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chofer" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "fecha_nacimiento" DATE,
    "direccion" TEXT,
    "telefono" TEXT,
    "id_estado" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chofer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "nit_ci" TEXT,
    "direccion" TEXT,
    "ciudad" TEXT,
    "id_estado" INTEGER,
    "fecha_registro" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacto" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER,
    "nombre" TEXT,
    "cargo" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento_chata" (
    "id" SERIAL NOT NULL,
    "id_chata" INTEGER,
    "id_tipo_documento" INTEGER,
    "numero_documento" TEXT,
    "fecha_emision" DATE,
    "fecha_vencimiento" DATE,
    "estado" TEXT,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documento_chata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento_chofer" (
    "id" SERIAL NOT NULL,
    "id_chofer" INTEGER,
    "id_tipo_documento" INTEGER,
    "numero_documento" TEXT,
    "fecha_emision" DATE,
    "fecha_vencimiento" DATE,
    "estado" TEXT,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documento_chofer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento_vehiculo" (
    "id" SERIAL NOT NULL,
    "id_vehiculo" INTEGER,
    "id_tipo_documento" INTEGER,
    "numero_documento" TEXT,
    "fecha_emision" DATE,
    "fecha_vencimiento" DATE,
    "estado" TEXT,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documento_vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_chofer" (
    "id" SERIAL NOT NULL,
    "estado" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estado_chofer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_cliente" (
    "id" SERIAL NOT NULL,
    "estado" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estado_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_vehiculo" (
    "id" SERIAL NOT NULL,
    "estado" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estado_vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento_carga" (
    "id" SERIAL NOT NULL,
    "id_carga" INTEGER,
    "fecha_hora" TIMESTAMP(3),
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evento_carga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mantenimiento" (
    "id" SERIAL NOT NULL,
    "id_vehiculo" INTEGER,
    "id_chata" INTEGER,
    "tipo_activo" TEXT,
    "fecha_mantenimiento" DATE,
    "costo" DECIMAL(10,2),
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mantenimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "rol" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruta" (
    "id" SERIAL NOT NULL,
    "ciudad_origen" TEXT,
    "ciudad_destino" TEXT,
    "distancia" DECIMAL(10,2),
    "tiempo_estimado" TEXT,
    "condiciones_ruta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_documento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "descripcion" TEXT,
    "requiere_renovacion" BOOLEAN DEFAULT true,
    "dias_alerta" INTEGER DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trayecto" (
    "id" SERIAL NOT NULL,
    "id_viaje" INTEGER,
    "id_ruta" INTEGER,
    "orden" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trayecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "clave" TEXT,
    "pin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculo" (
    "id" SERIAL NOT NULL,
    "id_chata" INTEGER,
    "placa" TEXT,
    "modelo" TEXT,
    "marca" TEXT,
    "anio" INTEGER,
    "tipo_vehiculo" TEXT,
    "id_estado" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viaje" (
    "id" SERIAL NOT NULL,
    "id_camion" INTEGER,
    "id_chofer" INTEGER,
    "fecha_salida" DATE,
    "fecha_llegada" DATE,
    "estado_viaje" TEXT,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "viaje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_companyId_idx" ON "Contact"("companyId");

-- CreateIndex
CREATE INDEX "Event_companyId_idx" ON "Event"("companyId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carga" ADD CONSTRAINT "carga_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carga" ADD CONSTRAINT "carga_id_viaje_fkey" FOREIGN KEY ("id_viaje") REFERENCES "viaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chofer" ADD CONSTRAINT "chofer_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_chofer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacto" ADD CONSTRAINT "contacto_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_chata" ADD CONSTRAINT "documento_chata_id_chata_fkey" FOREIGN KEY ("id_chata") REFERENCES "chata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_chata" ADD CONSTRAINT "documento_chata_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_chofer" ADD CONSTRAINT "documento_chofer_id_chofer_fkey" FOREIGN KEY ("id_chofer") REFERENCES "chofer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_chofer" ADD CONSTRAINT "documento_chofer_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_vehiculo" ADD CONSTRAINT "documento_vehiculo_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento_vehiculo" ADD CONSTRAINT "documento_vehiculo_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_carga" ADD CONSTRAINT "evento_carga_id_carga_fkey" FOREIGN KEY ("id_carga") REFERENCES "carga"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mantenimiento" ADD CONSTRAINT "mantenimiento_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mantenimiento" ADD CONSTRAINT "mantenimiento_chata_fkey" FOREIGN KEY ("id_chata") REFERENCES "chata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol" ADD CONSTRAINT "rol_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trayecto" ADD CONSTRAINT "trayecto_id_viaje_fkey" FOREIGN KEY ("id_viaje") REFERENCES "viaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trayecto" ADD CONSTRAINT "trayecto_id_ruta_fkey" FOREIGN KEY ("id_ruta") REFERENCES "ruta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculo" ADD CONSTRAINT "vehiculo_id_chata_fkey" FOREIGN KEY ("id_chata") REFERENCES "chata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculo" ADD CONSTRAINT "vehiculo_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_vehiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viaje" ADD CONSTRAINT "viaje_id_camion_fkey" FOREIGN KEY ("id_camion") REFERENCES "vehiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viaje" ADD CONSTRAINT "viaje_id_chofer_fkey" FOREIGN KEY ("id_chofer") REFERENCES "chofer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
