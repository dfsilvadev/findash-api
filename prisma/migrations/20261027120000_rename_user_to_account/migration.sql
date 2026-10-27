-- Renomeia user -> account preservando os dados (RENAME em vez de DROP/CREATE).

-- RenameEnum
ALTER TYPE "user_status" RENAME TO "account_status";

-- RenameTable
ALTER TABLE "users" RENAME TO "accounts";
ALTER TABLE "accounts" RENAME CONSTRAINT "users_pkey" TO "accounts_pkey";
ALTER TABLE "accounts" RENAME CONSTRAINT "users_deleted_consistency_check" TO "accounts_deleted_consistency_check";
ALTER INDEX "users_email_active_key" RENAME TO "accounts_email_active_key";

-- RenameColumn
ALTER TABLE "categories" RENAME COLUMN "user_id" TO "account_id";
ALTER TABLE "transactions" RENAME COLUMN "user_id" TO "account_id";

-- RenameIndex
ALTER INDEX "categories_id_user_id_type_key" RENAME TO "categories_id_account_id_type_key";
ALTER INDEX "categories_user_id_name_key" RENAME TO "categories_account_id_name_key";
ALTER INDEX "transactions_user_id_date_id_idx" RENAME TO "transactions_account_id_date_id_idx";

-- RenameForeignKey
ALTER TABLE "categories" RENAME CONSTRAINT "categories_user_id_fkey" TO "categories_account_id_fkey";
ALTER TABLE "transactions" RENAME CONSTRAINT "transactions_user_id_fkey" TO "transactions_account_id_fkey";
ALTER TABLE "transactions" RENAME CONSTRAINT "transactions_category_id_user_id_type_fkey" TO "transactions_category_id_account_id_type_fkey";
