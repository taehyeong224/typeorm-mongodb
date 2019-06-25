import {createConnection} from 'typeorm';
import 'reflect-metadata';
import * as cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";
import TYPES from './constant/types';
import './controller/TestController';
import './controller/UserController';
import { Request, Response, NextFunction } from "express";
import { AbstractDao } from './dao/base/AbstractDao';
import { TestService } from './service/TestService';
import { TestDao } from './dao/TestDao';
import { Test } from './entity/Test';
import { typeormConfig } from './config/mongodb';
import { UserService } from './service/UserService';
import { User } from './entity/User';
import { UserDao } from './dao/UserDao';
// load everything needed to the Container
let container = new Container();
container.bind<TestService>(TYPES.TestService).to(TestService).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<AbstractDao<Test>>(TYPES.TestDao).to(TestDao).inSingletonScope();
container.bind<AbstractDao<User>>(TYPES.UserDao).to(UserDao).inSingletonScope();



// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(cors({ origin: true, credentials: true }));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        err.status = 404;
        next(err);
    });
});
createConnection(typeormConfig).then(() => {
    let serverInstance = server.build();
    serverInstance.listen(3000);
    console.log('Server started on port 3000 :)');
}).catch((e) => {
    console.log("db error : ", e)
});
