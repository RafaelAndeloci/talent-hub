import { DataTypes, Model } from 'sequelize';
import { Language } from '../../../enums/language';
import { LanguageProficiency } from '../types/enums/language-proficiency';
import { database, primaryColumn } from '../../../config/database';
import { CandidateLanguageModelAttr } from './types/candidate-language-model-attr';

export class CandidateLanguageModel extends Model<CandidateLanguageModelAttr> {}

CandidateLanguageModel.init(
    {
        id: primaryColumn,
        language: {
            type: DataTypes.ENUM(...Object.values(Language)),
            allowNull: false,
        },
        writtenLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        spokenLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        readingLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
        listeningLevel: {
            type: DataTypes.ENUM(...Object.values(LanguageProficiency)),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        underscored: true,
        tableName: 'candidate_languages',
        modelName: 'CandidateLanguage',
    },
);
