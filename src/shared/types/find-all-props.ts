export default interface FindAllProps {
  where?: any;
  limit?: number;
  offset?: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
  searchBy?: string;
  search?: string;
}