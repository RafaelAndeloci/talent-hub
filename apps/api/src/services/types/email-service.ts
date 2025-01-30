export type EmailService = {
    send: (args: { body: string; isHtml?: boolean; subject: string; to: string }) => Promise<void>;
};
