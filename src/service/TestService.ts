import { inject, injectable } from 'inversify';
import TYPES from "../constant/types";
import { TestDao } from '../dao/TestDao';
import { Test } from '../entity/Test';
import { ErrorModel } from '../util/ErrorModel';
import { errorCode, category } from '../config/ErrorCode';
import { apply } from "json-merge-patch";

@injectable()
export class TestService {

    @inject(TYPES.TestDao) private testDao: TestDao;


    public async getTestByIdx(idx: string): Promise<Test> {
        return this.testDao.findOneById(idx);
    }

    public async getTests(): Promise<Test[]> {
        return this.testDao.findAll();
    }

    public async insert(body): Promise<Test> {
        const test: Test = new Test(body.name, body.options);
        test.regDate = new Date();
        test.modDate = new Date();
        return this.testDao.insert(test);
    }

    public async update(id, body): Promise<Test> {
        let test = await this.getTestByIdx(id);
        if (!test) {
            throw new ErrorModel(404, errorCode.notFound, category.input, `${id} not found`);
        }
        test = <Test>apply(test, body);
        return this.testDao.update(test);
    }
}
