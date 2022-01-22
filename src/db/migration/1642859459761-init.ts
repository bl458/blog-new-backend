import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1642859459761 implements MigrationInterface {
  name = 'init1642859459761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_session\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`token\` varchar(256) NOT NULL, \`userId\` varchar(36) NULL, INDEX \`IDX_b5eb7aa08382591e7c2d1244fe\` (\`userId\`), INDEX \`IDX_c35ccb7d788fd7de3414465ddc\` (\`token\`, \`createdAt\`), UNIQUE INDEX \`IDX_b330b1d48bb9384e7f4b8efbc0\` (\`token\`), UNIQUE INDEX \`REL_b5eb7aa08382591e7c2d1244fe\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`pw\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`blog_post\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`titleSub\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, INDEX \`IDX_6837b6ab946d2d8966e1ce4290\` (\`createdAt\`), INDEX \`IDX_be32f0ec0fc07e2a1c95d77f7c\` (\`id\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`blog_post_tags_tag\` (\`blogPostId\` varchar(36) NOT NULL, \`tagId\` varchar(36) NOT NULL, INDEX \`IDX_bf05feace838b79c501de1af84\` (\`blogPostId\`), INDEX \`IDX_90bd0ea937555c1536bb633ff3\` (\`tagId\`), PRIMARY KEY (\`blogPostId\`, \`tagId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_session\` ADD CONSTRAINT \`FK_b5eb7aa08382591e7c2d1244fe5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_post\` ADD CONSTRAINT \`FK_0eb9427b0d57b61dec38b661277\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_post_tags_tag\` ADD CONSTRAINT \`FK_bf05feace838b79c501de1af846\` FOREIGN KEY (\`blogPostId\`) REFERENCES \`blog_post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_post_tags_tag\` ADD CONSTRAINT \`FK_90bd0ea937555c1536bb633ff3a\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE \`query-result-cache\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NULL, \`time\` bigint NOT NULL, \`duration\` int NOT NULL, \`query\` text NOT NULL, \`result\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`query-result-cache\``);
    await queryRunner.query(
      `ALTER TABLE \`blog_post_tags_tag\` DROP FOREIGN KEY \`FK_90bd0ea937555c1536bb633ff3a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_post_tags_tag\` DROP FOREIGN KEY \`FK_bf05feace838b79c501de1af846\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_post\` DROP FOREIGN KEY \`FK_0eb9427b0d57b61dec38b661277\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_session\` DROP FOREIGN KEY \`FK_b5eb7aa08382591e7c2d1244fe5\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_90bd0ea937555c1536bb633ff3\` ON \`blog_post_tags_tag\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bf05feace838b79c501de1af84\` ON \`blog_post_tags_tag\``,
    );
    await queryRunner.query(`DROP TABLE \`blog_post_tags_tag\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_be32f0ec0fc07e2a1c95d77f7c\` ON \`blog_post\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6837b6ab946d2d8966e1ce4290\` ON \`blog_post\``,
    );
    await queryRunner.query(`DROP TABLE \`blog_post\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`REL_b5eb7aa08382591e7c2d1244fe\` ON \`user_session\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b330b1d48bb9384e7f4b8efbc0\` ON \`user_session\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c35ccb7d788fd7de3414465ddc\` ON \`user_session\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b5eb7aa08382591e7c2d1244fe\` ON \`user_session\``,
    );
    await queryRunner.query(`DROP TABLE \`user_session\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\` ON \`tag\``,
    );
    await queryRunner.query(`DROP TABLE \`tag\``);
  }
}
