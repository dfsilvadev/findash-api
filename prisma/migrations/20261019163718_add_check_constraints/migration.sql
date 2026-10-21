-- Prisma não suporta CHECK no schema; constraints mantidas apenas via SQL.

-- AddCheckConstraint: valor sempre positivo (o sinal vem de "type")
ALTER TABLE "transactions"
  ADD CONSTRAINT "transactions_amount_positive_check" CHECK ("amount" > 0);

-- AddCheckConstraint: asset_class só é permitido em categorias de investimento
ALTER TABLE "categories"
  ADD CONSTRAINT "categories_asset_class_investment_check"
  CHECK ("asset_class" IS NULL OR "type" = 'INVESTMENT');

-- AddCheckConstraint: status DELETED e deleted_at devem andar juntos
ALTER TABLE "users"
  ADD CONSTRAINT "users_deleted_consistency_check"
  CHECK (("status" = 'DELETED') = ("deleted_at" IS NOT NULL));
