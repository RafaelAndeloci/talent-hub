import repositoryFactory from '../../services/repository-factory';
import CompanyModel from './types/company-model';

const companyRepository = repositoryFactory.buildFor<CompanyModel>({
  modelName: 'Company',
});

export default companyRepository;
