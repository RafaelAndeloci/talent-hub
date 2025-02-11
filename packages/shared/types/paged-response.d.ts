export interface PagedMeta {
    offset: number;
    limit: number;
    count: number;
    recordCount: number;
    page: number;
    pageCount: number;
}

export interface PagedResponse<T> {
    meta: PagedMeta;
    records: T[];

    parse<K>(parser: (from: T) => K): PagedResponse<K>;
}
