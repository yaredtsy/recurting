import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1653445425360 implements MigrationInterface {
    name = 'migrationName1653445425360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "lastName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "location"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "lastName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "image" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "location" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "lastname" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "localhost" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ALTER COLUMN "professionalSummary"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ALTER COLUMN "phone"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ALTER COLUMN "city"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ALTER COLUMN "city" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ALTER COLUMN "phone" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ALTER COLUMN "professionalSummary" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "localhost"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "lastname"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "location"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile" DROP COLUMN "lastName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "location" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "image" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_detaile"
            ADD "lastName" character varying NOT NULL
        `);
    }

}
