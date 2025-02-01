import { DataTypes, Model } from 'sequelize';
import { database } from '../../../config/database';
import { CandidateReferenceModelAttr } from './types/candidate-reference-model-attr';
import { primaryColumn } from '../../../constants/database-column.def';

export class CandidateReferenceModel extends Model<CandidateReferenceModelAttr> {}

CandidateReferenceModel.init(
    {
        id: primaryColumn,
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        relationship: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        underscored: true,
        tableName: 'candidate_references',
        modelName: 'CandidateReference',
    },
);
