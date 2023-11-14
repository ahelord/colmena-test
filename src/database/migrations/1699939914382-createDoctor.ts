import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDoctor1699939914382 implements MigrationInterface {
  name = 'createDoctor1699939914382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationDocument" character varying(20) NOT NULL, "firstName" character varying(90) NOT NULL, "lastName" character varying(90) NOT NULL, "email" character varying(200) NOT NULL, "phone" character varying(20) NOT NULL, "address" character varying(200) NOT NULL, "city" character varying(90) NOT NULL, "professionalCard" character varying NOT NULL, "admissionAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctor"`);
  }
}
