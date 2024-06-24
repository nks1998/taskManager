import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/tasks.entity";
export const typeOrmConfig : TypeOrmModuleOptions  = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    entities: [Task],
    //entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
    synchronize: true,
    // connectTimeoutMS: 30000, // Increase timeout to 30 seconds
    // ssl: {
    //     rejectUnauthorized: false, // This might be needed if your database requires SSL
    // },
}