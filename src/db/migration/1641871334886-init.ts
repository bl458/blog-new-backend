import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1641871334886 implements MigrationInterface {
  name = 'init1641871334886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`postId\` varchar(36) NULL, UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`pw\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`titleSub\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_session\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`token\` varchar(256) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_b5eb7aa08382591e7c2d1244fe\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_7435e891c35f2687d7969490476\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_session\` ADD CONSTRAINT \`FK_b5eb7aa08382591e7c2d1244fe5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE \`query-result-cache\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NULL, \`time\` bigint NOT NULL, \`duration\` int NOT NULL, \`query\` text NOT NULL, \`result\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`query-result-cache\``);
    await queryRunner.query(
      `ALTER TABLE \`user_session\` DROP FOREIGN KEY \`FK_b5eb7aa08382591e7c2d1244fe5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_7435e891c35f2687d7969490476\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_b5eb7aa08382591e7c2d1244fe\` ON \`user_session\``,
    );
    await queryRunner.query(`DROP TABLE \`user_session\``);
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\` ON \`tag\``,
    );
    await queryRunner.query(`DROP TABLE \`tag\``);
  }
}
