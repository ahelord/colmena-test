import {MigrationInterface, QueryRunner} from "typeorm";

export class createMedicalOrder1700003920354 implements MigrationInterface {
    name = 'createMedicalOrder1700003920354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medical_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "specialty" character varying NOT NULL, "expiresIn" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appointmentId" uuid, CONSTRAINT "PK_c62eae711f1746ddeb1e1553420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medical_order" ADD CONSTRAINT "FK_50a946d6afeaa1cd3cd5447ce0e" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_order" DROP CONSTRAINT "FK_50a946d6afeaa1cd3cd5447ce0e"`);
        await queryRunner.query(`DROP TABLE "medical_order"`);
    }

}
