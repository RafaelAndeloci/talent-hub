import Company from "./company";

type CreateCompanyPayload = Omit<Company, 'id'>;

export default CreateCompanyPayload;