import { AppEvent } from '../../enums/app-event';
import { emailService } from '../../services/email-service';
import { userRepository } from '../users/user-repository';
import { skillRepository } from './skill-repository';

export const SkillEventHandler = {
    [AppEvent.SkillStatusUpdated]: async ({ skillId }: { skillId: string }) => {
        const skill = await skillRepository.findById(skillId);
        if (!skill.suggestedBy) {
            return;
        }

        const suggestedBy = await userRepository.findById(skill.suggestedBy);

        const body =
            skill.status === 'approved'
                ? `Sua sugestão ${skill.name} para a nossa base de habilidades foi aceita!`
                : `Infelizmente a sua sugestão de habilidade ${skill.name} não foi aceita. Tente de novo, ou entre em contado com o suporte...`;

        await emailService.send({
            subject: 'TALENT HUB - SUGESTÃO DE HABILIDADE',
            body: `Olá ${suggestedBy.username}, como vão as coisas? \n ${body}`,
            to: suggestedBy.email,
        });
    },
};
