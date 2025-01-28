-- CreateTable
CREATE TABLE "petshop_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "petshop_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "deadline_vaccination" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_petshop_have_pets_table" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "petshop_table_cnpj_key" ON "petshop_table"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "_petshop_have_pets_table_AB_unique" ON "_petshop_have_pets_table"("A", "B");

-- CreateIndex
CREATE INDEX "_petshop_have_pets_table_B_index" ON "_petshop_have_pets_table"("B");

-- AddForeignKey
ALTER TABLE "_petshop_have_pets_table" ADD CONSTRAINT "_petshop_have_pets_table_A_fkey" FOREIGN KEY ("A") REFERENCES "pet_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_petshop_have_pets_table" ADD CONSTRAINT "_petshop_have_pets_table_B_fkey" FOREIGN KEY ("B") REFERENCES "petshop_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
