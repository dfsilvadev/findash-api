-- DropIndex
DROP INDEX "transactions_user_id_date_idx";

-- CreateIndex
CREATE INDEX "transactions_user_id_date_id_idx" ON "transactions"("user_id", "date" DESC, "id" DESC);
