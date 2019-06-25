import { ENV } from "../util/enum";
import { Test, User } from "../entity";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

let config: MongoConnectionOptions;
const entities = [Test, User];
console.log("entities : ", entities);
if (process.env.NODE_ENV === ENV.local) {
    config = {
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "test",
        synchronize: true,
        logging: true,
        entities: entities
    };
}

export const typeormConfig = config;