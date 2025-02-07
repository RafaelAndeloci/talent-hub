import { SkillDto } from "./skill-dto";

export type CreateSkillPayload = Omit<SkillDto, 'id' | 'status'>;