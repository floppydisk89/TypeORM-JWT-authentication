import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1620405010256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(new Table({
            name: "users",
            columns:[
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "gen_random_uuid()",

                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable("users");
    }

}
