import { AbstractDao } from "./base/AbstractDao";
import { FindOneOptions } from "typeorm";
import { injectable } from "inversify";
import { User } from "../entity/User";

@injectable()
export class UserDao extends AbstractDao<User> {

    constructor() {
        super(User);
    }
    async insert(object: User): Promise<User> {
        return this.repo.save(object);
    }    
    
    select(objectIdx: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(object: User): Promise<User> {
        return this.repo.save(object);
    }

    async findOne(objectId: string, findOption: FindOneOptions): Promise<User> {
        return this.repo.findOne(objectId, findOption);
    }

    async delete(object: User): Promise<void> {
        await this.repo.remove(object);
    }

    async findAll() {
        return this.repo.find();
    }

}