import { ENV } from "../util/enum";
import { Test } from "../entity/Test";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

let config: MongoConnectionOptions;
const entities = [Test];

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