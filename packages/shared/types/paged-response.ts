export class PagedResponse<T> {
    private readonly items: T[];
    private readonly total: number;
    private readonly limit: number;
    private readonly offset: number;
    private readonly currentPage: number;
    private readonly totalPages: number;

    private constructor(items: T[], total: number, limit: number, offset: number) {
        this.items = items;
        this.total = total;
        this.limit = limit;
        this.offset = offset;

        this.currentPage = Math.floor(offset / limit) + 1;
        this.totalPages = Math.ceil(total / limit);
    }

    parse<U>(parser: (item: T) => U): PagedResponse<U> {
        return new PagedResponse(this.items.map(parser), this.total, this.limit, this.offset);
    }

    toJson(): {
        meta: {
            total: number;
            limit: number;
            offset: number;
            recordCount: number;
            currentPage: number;
            totalPages: number;
        };
        records: T[];
    } {
        return {
            meta: {
                total: this.total,
                limit: this.limit,
                offset: this.offset,
                recordCount: this.items.length,
                currentPage: this.currentPage,
                totalPages: this.totalPages,
            },
            records: this.items,
        };
    }

    public static create<T>(
        limit: number,
        offset: number,
        total: number,
        items: T[],
    ): PagedResponse<T> {
        return new PagedResponse(items, total, limit, offset);
    }
}
