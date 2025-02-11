import { SkillType } from "../skills";
import { Proficiency } from "./proficiency";

export interface SkillProfile {
    skillId: string;
    skillName?: string;
    skillType?: SkillType;
    proficiencyLevel: Proficiency;
}