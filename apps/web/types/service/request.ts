import { ApiMethods } from "./methods";

export type RequestProps = {
  endpoint: string;
  method: ApiMethods;
  data?: any;
  query?: string;
};
