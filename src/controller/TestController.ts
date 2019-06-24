import { controller, httpDelete, httpGet, httpPost, httpPatch } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TestService } from '../service/TestService';
import * as express from 'express';
import TYPES from '../constant/types';
import { errorHandle } from "../util/util";
import {ObjectID} from "mongodb";
import { ErrorModel } from '../util/ErrorModel';
import { errorCode, category } from '../config/ErrorCode';

@controller('/')
export class TestController {

    constructor(@inject(TYPES.TestService) private testService: TestService) {}

    @httpGet('/')
    public async someGet(request: express.Request, response: express.Response) {
        try {
            const result = await this.testService.getTests();
            console.log("result :", result);
            response.status(200).json({ msg: "success", data: result, kk: "hi" });
        } catch (e) {
            errorHandle(e, response)
        }
    }

    @httpGet(':id')
    public async someGetByID(request: express.Request, response: express.Response) {
        try {
            const ID: string = request.params.id;
            if (!ObjectID.isValid(ID)) {
                throw new ErrorModel(400, errorCode.fieldValid, category.input, "invalid id");
            }
            console.log(ObjectID.isValid(ID));
            const result = await this.testService.getTestByIdx(ID);
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
            const result = await this.testService.insert(request.body);
            response.status(201).json({ msg: "success" , result});
        } catch (e) {
            errorHandle(e, response)
        }
    }

    @httpPatch(':id')
    public async somePut(request: any, response: express.Response) {
        try {
            const ID: string = request.params.id;
            if (!ObjectID.isValid(ID)) {
                throw new ErrorModel(400, errorCode.fieldValid, category.input, "invalid id");
            }
            const result = await this.testService.update(ID, request.body);
            response.status(200).json({ msg: "success", result });
        } catch (e) {
            console.log("error : ", e);
            errorHandle(e, response)
        }
    }

    @httpDelete('/:id')
    public async someDelete(request: express.Request, response: express.Response) {
        try {
            response.status(204).json({});
        } catch (e) {
            errorHandle(e, response)
        }
    }
}
