import { faker } from '@faker-js/faker';
import moment from 'moment';

import { PositionLevel } from '../../api/candidates/types/enums/position-level';
import { ContractType } from '../../api/candidates/types/enums/contract-type';
import { EmploymentType } from '../../api/candidates/types/enums/employment-type';
import { WorkplaceType } from '../../api/candidates/types/enums/workplace-type';
import { Benefit } from '../../api/candidates/types/enums/benefit';
import { AcademicStatus } from '../../api/candidates/types/enums/academic-status';
import { Candidate } from '../../api/candidates/types/candidate';
import { AcademicDegreeType } from '../../api/candidates/types/enums/academic-degree-type';
import { Uf } from '../../enums/uf';
import { Language } from '../../enums/language';
import { LanguageProficiency } from '../../api/candidates/types/enums/language-proficiency';
import { Role } from '../../api/users/types/enums/role';
import { hasher } from '../../services/hasher';
import { AchievementType } from '../../api/candidates/types/enums/achievement-type';
import { Company } from '../../api/companies/types/company';
import { User } from '../../api/users/types/user';

const generateYearMonth = () => ({
    year: faker.number.int({ min: 2000, max: 2023 }) || 2023,
    month: faker.number.int({ min: 1, max: 12 }) || 12,
});

const generatePeriod = () => ({
    start: generateYearMonth(),
    end: faker.datatype.boolean() ? generateYearMonth() : null,
});

const genPhone = () =>
    faker.phone.number({ style: 'international' }).replace(/\D/g, '').padEnd(11, '0');

export const generateCandidates = (count: number, userId: string): Candidate[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        userId,
        fullName: faker.person.fullName(),
        birthDate: moment(
            faker.date.past({
                years: faker.number.int({ min: 18, max: 60 }),
            }),
        ).format('YYYY-MM-DD'),
        professionalHeadline: faker.person.jobTitle(),
        contact: {
            phone: genPhone(),
            email: faker.internet.email(),
        },
        address: {
            street: faker.location.street(),
            number: faker.location.buildingNumber(),
            complement: faker.location.secondaryAddress(),
            neighborhood: faker.location.county(),
            city: faker.location.city(),
            uf: faker.helpers.arrayElement(Object.values(Uf)),
            zipCode: faker.location.zipCode({ format: '########' }).padEnd(8, '0'),
        },
        cvUrl: faker.internet.url(),
        about: faker.lorem.paragraph(),
        bannerUrl: faker.image.url(),
        hobbies: [faker.word.sample(), faker.word.sample()],
        social: {
            linkedin: faker.internet.url(),
            github: faker.internet.url(),
            twitter: faker.internet.url(),
            facebook: faker.internet.url(),
            instagram: faker.internet.url(),
            youtube: faker.internet.url(),
            medium: faker.internet.url(),
            website: faker.internet.url(),
        },
        isAvailableForWork: faker.datatype.boolean(),
        allowThirdPartyApplications: faker.datatype.boolean(),
        preferences: {
            salary: faker.number.int({ min: 3000, max: 10000 }),
            contractType: faker.helpers.arrayElement(Object.values(ContractType)),
            employmentType: faker.helpers.arrayElement(Object.values(EmploymentType)),
            workplaceType: faker.helpers.arrayElement(Object.values(WorkplaceType)),
            benefits: faker.helpers.arrayElements(Object.values(Benefit), 3),
            positionLevel: faker.helpers.arrayElement(Object.values(PositionLevel)),
        },
        experiences: {
            education: Array.from({ length: 5 }, () => ({
                degree: faker.person.jobTitle(),
                fieldOfStudy: faker.person.jobArea(),
                type: faker.helpers.arrayElement(Object.values(AcademicDegreeType)),
                institution: faker.company.name(),
                institutionWebsite: faker.internet.url(),
                description: faker.lorem.sentence(),
                period: generatePeriod(),
                isCurrent: faker.datatype.boolean(),
                status: faker.helpers.arrayElement(Object.values(AcademicStatus)),
                semesters: faker.number.int({ min: 6, max: 12 }),
                currentSemester: faker.number.int({ min: 1, max: 12 }),
                institutionRegistrationNumber: faker.string.uuid(),
                gradePointAverage: faker.number.float({ min: 0, max: 100 }),
                expectedGraduation: faker.datatype.boolean() ? generateYearMonth() : null,
            })),
            professional: Array.from({ length: 5 }, () => ({
                title: faker.person.jobTitle(),
                description: faker.lorem.paragraph(),
                company: faker.company.name(),
                employmentType: faker.helpers.arrayElement(Object.values(EmploymentType)),
                workplaceType: faker.helpers.arrayElement(Object.values(WorkplaceType)),
                positionLevel: faker.helpers.arrayElement(Object.values(PositionLevel)),
                isCurrent: faker.datatype.boolean(),
                period: generatePeriod(),
                location: {
                    uf: faker.helpers.arrayElement(Object.values(Uf)),
                    neighborhood: faker.location.county(),
                    city: faker.location.city(),
                },
                relatedSkills: [faker.word.sample(), faker.word.sample(), faker.word.sample()],
            })),
        },
        languages: [
            {
                language: faker.helpers.arrayElement(Object.values(Language)),
                writtenLevel: faker.helpers.arrayElement(Object.values(LanguageProficiency)),
                spokenLevel: faker.helpers.arrayElement(Object.values(LanguageProficiency)),
                readingLevel: faker.helpers.arrayElement(Object.values(LanguageProficiency)),
                listeningLevel: faker.helpers.arrayElement(Object.values(LanguageProficiency)),
            },
        ],
        references: Array.from({ length: 10 }, () => ({
            name: faker.person.fullName(),
            position: faker.person.jobTitle(),
            phone: genPhone(),
            email: faker.internet.email(),
            relationship: faker.word.sample(),
            company: faker.company.name(),
        })),
        achievements: Array.from({ length: 10 }, () => ({
            name: faker.word.sample(),
            type: faker.helpers.arrayElement(Object.values(AchievementType)),
            issuer: faker.company.name(),
            workload: faker.number.int({ min: 1, max: 1000 }),
            issueDate: faker.date.past(),
            expirationDate: faker.date.future(),
            credentialId: faker.string.uuid(),
            credentialUrl: faker.internet.url(),
            relatedSkills: [faker.word.sample(), faker.word.sample()],
        })),
    }));

export const generateCompanies = (count: number): Company[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        tradeName: faker.company.name(),
        legalName: faker.company.name(),
        cnpj: `${faker.number.int({ min: 5, max: 99 })}`.padEnd(14, '0'),
        employeesQuantity: faker.number.int({ min: 1, max: 1000 }),
        foundationYear: faker.number.int({ min: 1900, max: 2023 }),
        social: {
            linkedin: faker.internet.url(),
            github: faker.internet.url(),
            twitter: faker.internet.url(),
            facebook: faker.internet.url(),
            instagram: faker.internet.url(),
            youtube: faker.internet.url(),
            medium: faker.internet.url(),
            website: faker.internet.url(),
        },
        about: faker.lorem.paragraph(),
        contact: {
            phone: genPhone(),
            email: faker.internet.email(),
        },
        address: {
            street: faker.location.street(),
            number: faker.location.buildingNumber(),
            complement: faker.location.secondaryAddress(),
            neighborhood: faker.location.county(),
            city: faker.location.city(),
            uf: faker.helpers.arrayElement(Object.values(Uf)),
            zipCode: faker.location.zipCode({ format: '########' }).padEnd(8, '0'),
        },
        bannerUrl: faker.image.url(),
        logoUrl: faker.image.url(),
        mission: faker.lorem.paragraph(),
        vision: faker.lorem.paragraph(),
        values: [faker.lorem.word(), faker.lorem.word()],
        industry: faker.lorem.word(),
    }));

export const generateUsers = async (count: number): Promise<User[]> =>
    await Promise.all(
        Array.from({ length: count }).map(async () => ({
            id: faker.string.uuid(),
            username: faker.internet.username(),
            email: faker.internet.email(),
            role: faker.helpers.arrayElement(Object.values(Role)),
            hashedPassword: await hasher.hash(faker.internet.password()),
            passwordReset: null,
            emailConfirmationToken: null,
            profilePictureUrl: faker.image.avatar(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })),
    );
