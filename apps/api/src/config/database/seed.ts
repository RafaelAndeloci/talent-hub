import { Role } from '../../api/users/types/enums/role';
import { hasher } from '../../services/hasher';
import { config } from '../environment';
import { generateUsers, generateCandidates, generateCompanies } from './fake-data';

export const seed = async() => {
    const [{ UserModel }, { userRepository }, { candidateRepository }, { companyRepository }]
        = await Promise.all([
            import('../../api/users/user-model'),
            import('../../api/users/user-repository'),
            import('../../api/candidates/candidate-repository'),
            import('../../api/companies/company-repository'),
        ]);

    await UserModel.upsert({
        id: config.sysAdmin.id,
        username: config.sysAdmin.username,
        email: config.sysAdmin.email,
        role: Role.sysAdmin,
        hashedPassword: await hasher.hash(config.sysAdmin.password),
    });

    const users = await generateUsers(100);
    await userRepository.bulkCreate(users);

    const candidates = users
        .filter(u => u.role === Role.candidate || Role.sysAdmin)
        .map(u => generateCandidates(1, u.id)[0]);

    await candidateRepository.bulkCreate(candidates);

    const companies = generateCompanies(100);
    for (const c of companies) {
        await companyRepository.create(c);
    }
};
