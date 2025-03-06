import { DataTypes, Model, ModelStatic } from 'sequelize';
import database from '../../config/database';
import { primaryColumn } from '../../constants/database-column.def';
import { UserModelAttr } from '../users/user-model';
import { Skill, SkillCategory, SkillType, SuggestionStatus } from '@talent-hub/shared';
import SuggestionModel from '../../types/suggestion-model';

export type SkillModelAttr = SuggestionModel<Skill>;

export class SkillModel extends Model<SkillModelAttr> {
    static associate({ User }: { User: ModelStatic<Model<UserModelAttr>> }) {
        SkillModel.belongsTo(User, {
            foreignKey: 'suggestedBy',
            onDelete: 'SET NULL',
        });

        SkillModel.belongsTo(User, {
            foreignKey: 'validatedBy',
            onDelete: 'SET NULL',
        });

        User.hasMany(SkillModel, {
            foreignKey: 'suggestedBy',
            as: 'suggestedSkills',
        });

        User.hasMany(SkillModel, {
            foreignKey: 'validatedBy',
            as: 'validatedSkills',
        });

        SkillModel.beforeFind((options) => {
            options.include = [
                {
                    model: SkillModel,
                    as: 'relatedSkills',
                    attributes: ['id'],
                },
            ];
        });
    }
}

SkillModel.init(
    {
        id: primaryColumn,
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        status: { type: DataTypes.ENUM(...Object.values(SuggestionStatus)) },
        categories: { type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(SkillCategory))) },
        type: { type: DataTypes.ENUM(...Object.values(SkillType)) },
        tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
        suggestedBy: { type: DataTypes.UUID, allowNull: false },
        suggestedAt: { type: DataTypes.DATE, allowNull: false },
        validatedBy: { type: DataTypes.UUID, allowNull: true },
        validatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize: database, modelName: 'Skill', tableName: 'skills' },
);
