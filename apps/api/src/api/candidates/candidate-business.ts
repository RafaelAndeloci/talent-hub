import {
    Candidate,
    CandidateDto,
    CandidatePayload,
    PagedResponse,
    QueryArgs,
} from '@talent-hub/shared';
import ApiError from '../../utils/api-error';
import { CandidateRepository } from './candidate-repository';
import { CandidateParser } from './candidate-parser';
import { InputFile } from '../../types/input-file';
import FileStorageService from '../../services/file-storage-service';

export class CandidateBusiness {
    public constructor(private candidateRepository = new CandidateRepository()) {}

    async findById(id: string): Promise<CandidateDto> {
        const candidate = await this.candidateRepository.findById(id);
        if (!candidate) {
            ApiError.throwNotFound('candidate not found');
        }

        return CandidateParser.toDto(candidate);
    }

    async findAll(query: QueryArgs<Candidate>): Promise<PagedResponse<CandidateDto>> {
        const candidates = await this.candidateRepository.findAll({
            ...query,
            filter: query.filter as any,
        });

        return candidates.parse(CandidateParser.toDto);
    }

    async create({
        userId,
        payload,
    }: {
        userId: string;
        payload: CandidatePayload;
    }): Promise<CandidateDto> {
        const candidateAlreadyExists = await this.candidateRepository.exists({ userId });
        if (candidateAlreadyExists) {
            ApiError.throwUnprocessableEntity('candidate already exists');
        }

        const candidate = CandidateParser.newInstance({ userId, payload });

        await this.candidateRepository.create({ entity: candidate });

        return CandidateParser.toDto(candidate);
    }

    async update({
        candidateId,
        payload,
    }: {
        candidateId: string;
        payload: CandidatePayload;
    }): Promise<CandidateDto> {
        const candidate = await this.candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound('candidate not found');
        }

        const updated = CandidateParser.merge({
            original: candidate,
            changes: payload,
        });

        await this.candidateRepository.update({ entity: updated });

        return CandidateParser.toDto(updated);
    }

    async remove(id: string): Promise<void> {
        const candidate = await this.candidateRepository.findById(id);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${id} not found`);
        }

        await this.candidateRepository.deleteById({ id });
    }

    async updateCv({
        candidateId,
        file,
    }: {
        candidateId: string;
        file: InputFile;
    }): Promise<CandidateDto> {
        const candidate = await this.candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${candidateId} not found`);
        }

        const key = `candidate-${candidateId}-cv.${file.mimetype.split('/')[1]}`;

        const url = await FileStorageService.upload({
            file: file.content,
            contentType: file.mimetype,
            key,
        });
        if (!url) {
            ApiError.throwInternalServerError('error uploading cv file');
        }

        candidate.cvUrl = url;

        await this.candidateRepository.update({ entity: candidate });

        return CandidateParser.toDto(candidate);
    }

    async updateBanner({
        candidateId,
        file,
    }: {
        candidateId: string;
        file: InputFile;
    }): Promise<CandidateDto> {
        const candidate = await this.candidateRepository.findById(candidateId);
        if (!candidate) {
            ApiError.throwNotFound(`candidate with id ${candidateId} not found`);
        }

        const key = `candidate-${candidateId}-banner.${file.mimetype.split('/')[1]}`;
        const url = await FileStorageService.upload({
            file: file.content,
            contentType: file.mimetype,
            key,
        });

        if (!url) {
            ApiError.throwInternalServerError('error uploading banner file');
        }

        candidate.bannerUrl = url;

        await this.candidateRepository.update({ entity: candidate });

        return CandidateParser.toDto(candidate);
    }

    async validateForApplication({
        userRole,
        candidate,
    }: {
        userRole: string;
        candidate: Candidate;
    }): Promise<void> {
        if (!candidate.isAvailableForWork) {
            ApiError.throwUnprocessableEntity(
                `candidate ${candidate.id} is not available for work`,
            );
        }

        const thirdPartyApplicationAvailable =
            userRole !== 'candidate' && candidate.allowThirdPartyApplications;
        if (thirdPartyApplicationAvailable) {
            ApiError.throwUnprocessableEntity(
                `candidate ${candidate.id} does not allow third party applications`,
            );
        }
    }
}
