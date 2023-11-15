import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMedicament1700006354033 implements MigrationInterface {
  name = 'createMedicament1700006354033';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medicament" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "diseases" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79f8c14984662b4b94ec0259124" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "medical_order_medications_medicament" ("medicalOrderId" uuid NOT NULL, "medicamentId" uuid NOT NULL, CONSTRAINT "PK_9c42a9a2a3a262720aca15f72ca" PRIMARY KEY ("medicalOrderId", "medicamentId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be1e7c762d3e48fac14e15cf00" ON "medical_order_medications_medicament" ("medicalOrderId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16751c03d21f5d385d91f605fb" ON "medical_order_medications_medicament" ("medicamentId") `
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order_medications_medicament" ADD CONSTRAINT "FK_be1e7c762d3e48fac14e15cf00a" FOREIGN KEY ("medicalOrderId") REFERENCES "medical_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order_medications_medicament" ADD CONSTRAINT "FK_16751c03d21f5d385d91f605fbe" FOREIGN KEY ("medicamentId") REFERENCES "medicament"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_order_medications_medicament" DROP CONSTRAINT "FK_16751c03d21f5d385d91f605fbe"`
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order_medications_medicament" DROP CONSTRAINT "FK_be1e7c762d3e48fac14e15cf00a"`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_16751c03d21f5d385d91f605fb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_be1e7c762d3e48fac14e15cf00"`);
    await queryRunner.query(`DROP TABLE "medical_order_medications_medicament"`);
    await queryRunner.query(`DROP TABLE "medicament"`);
  }
}
