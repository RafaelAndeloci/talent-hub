type PagedListMetadata = {
  offset: number;
  limit: number;
  totalLength: number;
  pageCount: number;
};

export default class PagedList<T> {
  private constructor(
    offset: number,
    limit: number,
    totalLength: number,
    records: T[],
  ) {
    this.meta = {
      offset,
      limit,
      totalLength,
      pageCount: Math.ceil(totalLength / limit),
    };

    this.records = records;
  }

  public readonly meta: PagedListMetadata;
  public readonly records: T[];

  public static create<T>(
    offset: number,
    limit: number,
    totalLength: number,
    items: T[],
  ): PagedList<T> {
    if (offset < 0) {
      throw new Error(
        'a quantidade de itens pulados deve ser maior ou igual a 0',
      );
    }

    if (limit < 0) {
      throw new Error(
        'a quantidade de itens por página deve ser maior ou igual a 0',
      );
    }

    if (totalLength < 0) {
      throw new Error('O total de registros deve ser maior ou igual a 0');
    }

    if (items.length > totalLength) {
      throw new Error(
        'O tamanho da página não pode ser maior que o total de registros',
      );
    }

    return new PagedList(offset, limit, totalLength, items);
  }

  public parse<K>(parser: (from: T) => K): PagedList<K> {
    const parsed = this.records.map(parser);
    return new PagedList(
      this.meta.offset,
      this.meta.limit,
      this.meta.totalLength,
      parsed,
    );
  }
}
