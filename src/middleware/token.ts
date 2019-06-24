import * as express from "express";
import * as jwt from "jsonwebtoken";
import { SecretKey } from "../config/signature";
import { CustomRequest } from "../util/util";
import { errorCode, category } from "../config/ErrorCode";

export const checkToken = (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: errorCode.auth, category: category.security, message: "authentication fail" });
    }
    try {
        const token: string = req.headers.authorization;
        const decoded: any = jwt.verify(
            token,
            SecretKey.accessToken,
            {
                algorithms: ["HS256"],
                maxAge: "1h",
                issuer: "matthew409"
            });
        if (!decoded.isVerifiedEmail) {
            return res.status(401).json({ code: errorCode.auth, category: category.security, message: "email is not verified" });
        }
        req.userIdx = decoded.idx;
        console.log(`req.userIdx > ${req.userIdx}`)
        next()
    } catch (e) {
        console.error("token > error :", e)
        if (e.message === "jwt expired") {
            return res.status(401).json({ code: errorCode.tokenExpired, category: category.security, message: e.message })
        } else {
            return res.status(401).json({ code: errorCode.auth, category: category.security, message: e.message });
        }
    }
};

export const refreshToken = (req: any, res: express.Response, next: express.NextFunction) => {
    console.log("middleware refresh token")
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: errorCode.auth, category: category.security, message: "authentication fail" });
    }

    try {
        const token: string = req.headers.authorization;
        const decoded: any = jwt.verify(
            token,
            SecretKey.refreshToken,
            {
                algorithms: ["HS256"],
                maxAge: "1d",
                issuer: "matthew409"
            });
        console.log("decoded : ", decoded);
        req.userIdx = decoded.idx;
        next()
    } catch (e) {
        console.error("refresh error : ", e.message)
        if (e.message === "jwt expired") {
            return res.status(401).json({ code: errorCode.tokenExpired, category: category.security, message: e.message })
        } else {
            return res.status(401).json({ code: errorCode.auth, category: category.security, message: e.message });
        }
    }

};