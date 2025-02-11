import { Proficiency } from "./proficiency";
import { SkillType } from "./skill-type";

export interface SkillProfile {
    skillId: string;
    skillName?: string;
    skillType?: SkillType;
    proficiencyLevel: Proficiency;
}