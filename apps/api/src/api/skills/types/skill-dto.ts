import { Skill } from "./skill";

export type SkillDto = Omit<Skill, 'validation' | 'suggestedBy'>;

