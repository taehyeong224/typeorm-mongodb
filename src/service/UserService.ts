import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import { UserDao } from "../dao/UserDao";
import { FindOneOptions } from "typeorm";
import { User } from "../entity/User";
// import { Test } from "../entity/Test";
import { ErrorModel } from "../util/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";
import { apply } from "json-merge-patch";

@injectable()
export class UserService {
    @inject(TYPES.UserDao) private userDao: UserDao;

    public findOne(id: string, option: FindOneOptions) {
        return this.userDao.findOne(id, option);
    }

    public insert(body: any) {
        let user: User = new User();
        user.modDate = new Date();
        user.regDate = new Date();
        user.name = body.name;
        // user.tests = [];

        // for (let item of body.tests) {
        //     user.tests.push(new Test(item.name, { isGood: item.options.isGood, min: item.options.min, max: item.options.max }));
        // }
        return this.userDao.insert(user);
    }

    public async update(id: string, body: any) {
        let user: User = await this.findOne(id, {
            relations: ["tests"]
        });
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, `${id} not found`);
        }
        user = <User>apply(user, body);
        return this.userDao.update(user);
    }

    public async remove(id: string) {
        let user: User = await this.findOne(id, {});
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, `${id} not found`);
        }
        console.log("user : ", user);
        return this.userDao.delete(user);
    }

    public async getall() {
        return this.userDao.findAll();
    }
}