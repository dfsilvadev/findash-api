-- CreateExtension: texto case-insensitive ("Mercado" = "mercado")
CREATE EXTENSION IF NOT EXISTS "citext";

-- AlterTable: converte in-place (preserva dados; o índice único é reconstruído)
ALTER TABLE "categories"
  ALTER COLUMN "name" TYPE CITEXT USING "name"::CITEXT;

-- AddCheckConstraint: mantém o limite antigo de VARCHAR(150)
ALTER TABLE "categories"
  ADD CONSTRAINT "categories_name_length_check" CHECK (char_length("name") <= 150);
