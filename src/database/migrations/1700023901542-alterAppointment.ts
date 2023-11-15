import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterAppointment1700023901542 implements MigrationInterface {
  name = 'alterAppointment1700023901542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "medical_order" DROP CONSTRAINT "FK_50a946d6afeaa1cd3cd5447ce0e"`);
    await queryRunner.query(
      `ALTER TABLE "medical_order" ADD CONSTRAINT "FK_50a946d6afeaa1cd3cd5447ce0e" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "medical_order" DROP CONSTRAINT "FK_50a946d6afeaa1cd3cd5447ce0e"`);
    await queryRunner.query(
      `ALTER TABLE "medical_order" ADD CONSTRAINT "FK_50a946d6afeaa1cd3cd5447ce0e" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
