import { userRepository } from '../users/user-repository';
import { candidateRepository } from './candidate-repository';
import { userBusiness } from '../users/user-business';
import { Candidate } from './types/candidate';
import { Role } from '../users/types/enums/role';
import { CandidateBusiness } from './types/candidate-business';
import { candidateParser } from './candidate-parser';
import { fileStorageService } from '../../services/file-storage-service';
import { ApiError } from '../../types/api-error';
import { FindAllArgs } from '../../types/find-all-args';

export const candidateBusiness: CandidateBusiness = {
    findById: async (id) => {
        const candidate = await candidateRepository.findById(id);
        if (!candidate) {
            ApiError.throwNotFound('candidate not found');
        }

        return candidateParser.toDto({ candidate });
    },

    findAll: ({ query }) => candidateRepository.findAll(query as unknown as FindAllArgs<Candidate>),

    create: async ({ userId, payload }) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            ApiError.throwNotFound('user not found');
        }

        const candidateAlreadyExists = await candidateRepository.exists({ userId });
        if (candidateAlreadyExists) {
            ApiError.throwUnprocessableEntity('candidate already exists');
        }

        if (!userBusiness.canCreateCandidate({ user })) {
            ApiError.throwForbidden('user cannot create candidate');
        }

        const candidate = candidateParser.newInstance({ userId, payload });

        await candidateRepository.create({
            ...candidate,
            userId,
        });

        return candidateParser.toDto({ candidate });
    },

    update: async ({ candidateId, payload }) => {
        const candidate = await candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound('candidate not found');
        }

        const updated: Candidate = {
            ...candidate,
            ...payload,
        };

        await candidateRepository.update(updated);

        return candidateParser.toDto({ candidate: updated });
    },

    remove: async (id) => {
        const candidate = await candidateRepository.findById(id);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${id} not found`);
        }

        await candidateRepository.deleteById(id);
    },

    updateCv: async ({ candidateId, file }) => {
        const candidate = await candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${candidateId} not found`);
        }

        const key = `candidate-${candidateId}-cv.${file.mimetype.split('/')[1]}`;

        const url = await fileStorageService.upload({
            file: file.content,
            contentType: file.mimetype,
            key,
        });
        if (!url) {
            ApiError.throwInternalServerError('error uploading cv file');
        }
        candidate.cvUrl = url;

        await candidateRepository.update(candidate);
        return candidateParser.toDto({ candidate });
    },

    updateBanner: async ({ candidateId, file }) => {
        const candidate = await candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${candidateId} not found`);
        }

        const key = `candidate-${candidateId}-banner.${file.mimetype.split('/')[1]}`;
        const url = await fileStorageService.upload({
            file: file.content,
            contentType: file.mimetype,
            key,
        });

        if (!url) {
            ApiError.throwInternalServerError('error uploading banner file');
        }

        candidate.bannerUrl = url;

        await candidateRepository.update(candidate);
        return candidateParser.toDto({ candidate });
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
