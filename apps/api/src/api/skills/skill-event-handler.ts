import { AppEvent } from '../../enums/app-event';
import UserRepository from '../users/user-repository';
import { SkillRepository } from './skill-repository';
import { Role, SuggestionStatus } from '@talent-hub/shared';
import EmailService from '../../services/email-service';

const skillRepository = new SkillRepository();
const userRepository = new UserRepository();

export const SkillEventHandler = {
    [AppEvent.SkillStatusUpdated]: async ({ skillId }: { skillId: string }) => {
        const skill = await skillRepository.findById(skillId);
        if (!skill) {
            return;
        }

        if (!skill.suggestion.by) {
            return;
        }

        const suggestedBy = await userRepository.findById(skill.suggestion.by);
        if (!suggestedBy || suggestedBy.role === Role.SysAdmin) {
            return;
        }

        const body =
            skill.suggestion.status === SuggestionStatus.Approved
                ? `Sua sugestão ${skill.name} para a nossa base de habilidades foi aceita!`
                : `Infelizmente a sua sugestão de habilidade ${skill.name} não foi aceita. Tente de novo, ou entre em contado com o suporte...`;

        await EmailService.send({
            subject: 'TALENT HUB - SUGESTÃO DE HABILIDADE',
            body: `Olá ${suggestedBy.username}, como vão as coisas? \n ${body}`,
            to: suggestedBy.email,
        });
    },
};
