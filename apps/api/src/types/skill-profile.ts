import { Proficiency } from "../api/candidates/types/enums/proficiency";
import { SkillType } from "../api/candidates/types/enums/skill-type";

export interface SkillProfile {
    skillId: string;
    skillName?: string;
    skillType?: SkillType;
    proficiencyLevel: Proficiency;
}