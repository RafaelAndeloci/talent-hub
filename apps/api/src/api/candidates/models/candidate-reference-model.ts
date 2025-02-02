import { DataTypes, Model } from 'sequelize';
import database from '../../../config/database';
import { CandidateReferenceModelAttr } from './types/candidate-reference-model-attr';
import { primaryColumn } from '../../../constants/database-column.def';

export class CandidateReferenceModel extends Model<CandidateReferenceModelAttr> {}

CandidateReferenceModel.init(
    {
        id: primaryColumn,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relationship: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        underscored: true,
        timestamps: false,
        tableName: 'candidate_references',
        modelName: 'CandidateReference',
    },
);
