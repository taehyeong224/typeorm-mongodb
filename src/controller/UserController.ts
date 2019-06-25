import { controller, httpDelete, httpGet, httpPost, httpPatch } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import TYPES from '../constant/types';
import { errorHandle } from "../util/util";
import {ObjectID} from "mongodb";
import { ErrorModel } from '../util/ErrorModel';
import { errorCode, category } from '../config/ErrorCode';
import { UserService } from '../service/UserService';

@controller('/user')
export class UserController {

    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @httpGet('/')
    public async someGet(request: express.Request, response: express.Response) {
        try {
            const result = await this.userService.getall();
            console.log("result :", result);
            response.status(200).json({ msg: "success", data: result, kk: "hi" });
        } catch (e) {
            console.error("error : ", e);
            errorHandle(e, response)
        }
    }

    @httpGet('/:id')
    public async someGetByID(request: express.Request, response: express.Response) {
        try {
            const ID: string = request.params.id;
            if (!ObjectID.isValid(ID)) {
                throw new ErrorModel(400, errorCode.fieldValid, category.input, "invalid id");
            }
            console.log(ObjectID.isValid(ID));
            const result = await this.userService.findOne(ID, {
                relations: ["tests"]
            });
            console.log("result :", result);
            response.status(200).json({ msg: "success", data: result, kk: "hi" });
        } catch (e) {
            console.error("에러 : ", e);
            errorHandle(e, response)
        }
    }

    @httpPost('/')
    public async somePost(request: express.Request, response: express.Response) {
        try {
            const result = await this.userService.insert(request.body);
            response.status(201).json({ msg: "success" , result});
        } catch (e) {
            errorHandle(e, response)
        }
    }

    @httpPatch('/:id')
    public async somePut(request: any, response: express.Response) {
        try {
            const ID: string = request.params.id;
            if (!ObjectID.isValid(ID)) {
                throw new ErrorModel(400, errorCode.fieldValid, category.input, "invalid id");
            }
            const result = await this.userService.update(ID, request.body);
            response.status(200).json({ msg: "success", result });
        } catch (e) {
            console.log("error : ", e);
            errorHandle(e, response)
        }
    }

    @httpDelete('/:id')
    public async someDelete(request: express.Request, response: express.Response) {
        try {
            const ID: string = request.params.id;
            if (!ObjectID.isValid(ID)) {
                throw new ErrorModel(400, errorCode.fieldValid, category.input, "invalid id");
            }
            await this.userService.remove(ID);
            response.status(204).json({});
        } catch (e) {
            console.error("remove error : ", e);
            errorHandle(e, response)
        }
    }
}
