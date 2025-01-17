export default interface PagedResponse<T> {
  records: T[],
  count: number;
  limit: number;
  offset: number;
  pageCount: number;
}