import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";
@Entity()
export class Test {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    options: TestOption;

    @Column()
    regDate: Date;

    @Column()
    modDate: Date;

    constructor(name: string, options: TestOption) {
        this.name = name;
        this.options = options;
    }
}

interface TestOption {
    isGood: boolean;
    max: number,
    min: number
}