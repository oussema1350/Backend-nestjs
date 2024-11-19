export declare class MailService {
    private transporter;
    constructor();
    sendPasswordResetEmail(to: string, newPassword: string): Promise<void>;
}
