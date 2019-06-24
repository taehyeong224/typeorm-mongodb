export interface CRUDInterface<T> {
    insert(object: T): Promise<T>;
    select(objectIdx: number): Promise<T>;
    update(object: T): Promise<T>;
    delete(object: T): Promise<void>;
}