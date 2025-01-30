import { userRepository } from '../users/user-repository';
import { candidateRepository } from './candidate-repository';
import { userBusiness } from '../users/user-business';
import { Candidate } from './types/candidate';
import { Role } from '../users/types/enums/role';
import { CandidateBusiness } from './types/candidate-business';
import { candidateParser } from './candidate-parser';
import _ from 'lodash';
import { fileStorageService } from '../../services/file-storage-service';
import { ApiError } from '../../types/api-error';
import { FindAllArgs } from '../../types/find-all-args';

export const candidateBusiness: CandidateBusiness = {
    create: async ({ userId, payload }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound('User not found');
            return null!;
        }

        if (!userBusiness.canCreateCandidate({ user })) {
            ApiError.throwForbidden('User cannot create candidate');
            return null!;
        }

        const candidate = candidateParser.newInstance({ userId, payload });

        await candidateRepository.create({
            ...candidate,
            userId,
        });

        return candidate;
    },

    update: async ({ candidateId, payload }) => {
        const candidate = await candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound('Candidate not found');
            return null!;
        }

        const updated = _.merge(candidate, payload);
        await candidateRepository.update(updated);

        return updated;
    },

    findById: async (id: string): Promise<Candidate> => {
        const candidate = await candidateRepository.findById(id);
        if (!candidate) {
            ApiError.throwNotFound('Candidate not found');
            return null!;
        }

        return candidate;
    },

    findAll: (query) => candidateRepository.findAll(query as FindAllArgs<Candidate>),

    remove: async (id) => {
        const candidate = await candidateRepository.findById(id);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${id} not found`);
            return null!;
        }

        await candidateRepository.deleteById(id);
    },

    updateCv: async ({ candidateId, file }) => {
        const candidate = await candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${candidateId} not found`);
            return null!;
        }

        const key = `candidate-${candidateId}-cv.${file.mimetype.split('/')[1]}`;

        const url = await fileStorageService.upload({
            file: file.content,
            contentType: file.mimetype,
            key,
        });
        if (!url) {
            ApiError.throwInternalServerError('error uploading cv file');
            return null!;
        }
        candidate.cvUrl = url;

        await candidateRepository.update(candidate);
        return candidate;
    },

    updateBanner: async ({ candidateId, file }) => {
        const candidate = await candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`Candidate with id ${candidateId} not found`);
            return null!;
        }

        const key = `candidate-${candidateId}-banner.${file.mimetype.split('/')[1]}`;
        const url = await fileStorageService.upload({
            file: file.content,
            contentType: file.mimetype,
            key,
        });

        if (!url) {
            ApiError.throwInternalServerError('Error uploading banner file');
            return null!;
        }

        candidate.bannerUrl = url;

        await candidateRepository.update(candidate);
        return candidate;
    },

    validateForApplication: async ({ userRole, candidate }) => {
        if (!candidate.isAvailableForWork) {
            ApiError.throwUnprocessableEntity(
                `candidate ${candidate.id} is not available for work`,
            );
        }

        const thirdPartyApplicationAvailable =
            userRole !== Role.candidate && candidate.allowThirdPartyApplications;
        if (thirdPartyApplicationAvailable) {
            ApiError.throwUnprocessableEntity(
                `candidate ${candidate.id} does not allow third party applications`,
            );
        }
    },
};
