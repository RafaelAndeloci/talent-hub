import { PagedMeta, PagedResponse } from '@talent-hub/shared';

export class PagedResponseImp<T> implements PagedResponse<T> {
    meta: PagedMeta;
    records: T[];

    private constructor(offset: number, limit: number, recordCount: number, records: T[]) {
        this.records = records;

        this.meta = {
            limit,
            offset,
            recordCount,
            page: Math.floor(offset / limit) + 1,
            pageCount: Math.ceil(recordCount / limit),
            count: records.length,
        };
    }

    public static create<T>(
        limit: number,
        offset: number,
        totalLength: number,
        items: T[],
    ): PagedResponse<T> {
        if (offset < 0) {
            throw new Error('a quantidade de itens pulados deve ser maior ou igual a 0');
        }

        if (limit < 0) {
            throw new Error('a quantidade de itens por página deve ser maior ou igual a 0');
        }

        if (totalLength < 0) {
            throw new Error('O total de registros deve ser maior ou igual a 0');
        }

        if (items.length > totalLength) {
            throw new Error('O tamanho da página não pode ser maior que o total de registros');
        }

        return new PagedResponseImp(offset, limit, totalLength, items);
    }

    public parse<K>(parser: (from: T) => K): PagedResponse<K> {
        const parsed = this.records.map(parser);
        return new PagedResponseImp(
            this.meta.offset,
            this.meta.limit,
            this.meta.recordCount,
            parsed,
        );
    }
}
