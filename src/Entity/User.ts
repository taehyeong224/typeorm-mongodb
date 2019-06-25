import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";
// import { Test } from "./Test";
@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    regDate: Date;

    @Column()
    modDate: Date;
}