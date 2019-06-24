import * as express from "express";
import {ErrorModel} from "./ErrorModel";
import * as Joi from "joi";
import * as _ from "underscore";
import { errorCode } from "../config/ErrorCode";

export const errorHandle = (e: any, res: express.Response) => {
    if (e instanceof ErrorModel) {
        res.status(e.status).json({
            code: e.code,
            category: e.category,
            message: e.message
        });
    } else {
        res.status(500).json({
            code: "unknown",
            category: "unknown",
            message: "server error"
        });
    }
};

export function checkValidFields(schema: Joi.ObjectSchema, requestFields: object): void {
    const result = Joi.validate(requestFields, schema, {allowUnknown: true});
    console.log("Util > checkValidFields : ", requestFields);
    if (!_.isNull(result.error)) {
        throw new ErrorModel(400, errorCode.fieldValid, result.error.name, "some fields are wrong");
    }
}


export function checkValidEntity(entity: any): void {
    console.log("Util > checkValidEntity > entity >  ", entity);
    if (!entity) {
        throw new ErrorModel(404, "4004", "not found", "resource not found");
    }
}

export interface CustomRequest extends express.Request {
    userIdx: number
}