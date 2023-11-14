import {MigrationInterface, QueryRunner} from "typeorm";

export class createPatient1699890964445 implements MigrationInterface {
    name = 'createPatient1699890964445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationDocument" character varying(20) NOT NULL, "firstName" character varying(90) NOT NULL, "lastName" character varying(90) NOT NULL, "email" character varying(200) NOT NULL, "phone" character varying(20) NOT NULL, "address" character varying(200) NOT NULL, "city" character varying(90) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
