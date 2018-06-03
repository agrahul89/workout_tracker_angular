export class CategoryModel {

    constructor(public category: string, public editing: boolean = false) { }

    toString(): string {
        return JSON.stringify(this);
    }
}
