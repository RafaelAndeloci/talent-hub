type WhereOptions<T> = {
  OR?: WhereOptions<T>[];
  AND?: WhereOptions<T>[];
} & {
  [K in keyof T]?:
    | {
        equals?: T[K];
        not?: T[K];
        in?: T[K][];
        notIn?: T[K][];
        lt?: T[K];
        lte?: T[K];
        gt?: T[K];
        gte?: T[K];
        contains?: T[K];
        startsWith?: T[K];
        endsWith?: T[K];
      }
    | T[K];
};

export default WhereOptions;
