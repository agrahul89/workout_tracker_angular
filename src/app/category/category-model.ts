export class CategoryModel {

    constructor(
        public category: string,
        public editing: boolean = false,
        public id?: number) { }

    startsWith(query: string): boolean {
        if (query !== null || query !== undefined) {
            return this.category.startsWith(query.trim());
        }
        return false;
    }

    matches(category: string): boolean {
        const query = category === null || category === undefined ? '' : category.trim();
        return this.category === query;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
