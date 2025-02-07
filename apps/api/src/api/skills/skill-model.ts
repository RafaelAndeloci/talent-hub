import { DataTypes, Model } from 'sequelize';

import database from '../../config/database';
import { primaryColumn } from '../../constants/database-column.def';
import { SuggestionStatus } from '../../enums/suggestion-status';
import { SkillCategory } from './types/skill-category';
import { SkillType } from '../candidates/types/enums/skill-type';
import { SkillModelAttr } from './types/skill-model-attr copy';
import { UserModel } from '../users/user-model';

export class SkillModel extends Model<SkillModelAttr> {
    toJSON() {
        const attributes: any = super.toJSON();
        if (attributes.relatedSkills && Array.isArray(attributes.relatedSkills)) {
            attributes.relatedSkills = attributes.relatedSkills.map((skill: any) => skill.id);
        }
        return attributes;
    }
}

export class RelatedSkillModel extends Model<{ skillId: string; relatedSkillId: string }> {}

RelatedSkillModel.init(
    {
        skillId: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        relatedSkillId: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
    },
    {
        sequelize: database,
        modelName: 'RelatedSkill',
        tableName: 'related_skills',
        timestamps: false,
    },
);

SkillModel.init(
    {
        id: primaryColumn,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(SuggestionStatus)),
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(SkillCategory))),
        },
        type: {
            type: DataTypes.ENUM(...Object.values(SkillType)),
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        validatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        validatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        suggestedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    { sequelize: database, modelName: 'Skill', tableName: 'skills' },
);

SkillModel.belongsToMany(SkillModel, {
    through: RelatedSkillModel,
    as: 'relatedSkills',
    foreignKey: 'skillId',
    otherKey: 'relatedSkillId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

SkillModel.belongsTo(UserModel, {
    foreignKey: 'suggestedBy',
    onDelete: 'SET NULL',
});

SkillModel.belongsTo(UserModel, {
    foreignKey: 'validatedBy',
    onDelete: 'SET NULL',
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
