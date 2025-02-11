import { Model, DataTypes } from 'sequelize';
import database from '../../../config/database';
import { primaryColumn } from '../../../constants/database-column.def';
import { Language, LanguageProficiency } from '@talent-hub/shared';
import { CandidateLanguageModelAttr } from '../../../types/candidate-language-model-attr';

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
        timestamps: false,
        tableName: 'candidate_languages',
        modelName: 'CandidateLanguage',
    },
);

CandidateLanguageModel.prototype.toJSON = function () {
    const values = this.get();
    delete values.id;
    delete values.candidateId;
    return values;
};
