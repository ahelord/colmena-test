import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterAppointment1700023795123 implements MigrationInterface {
  name = 'alterAppointment1700023795123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`);
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
