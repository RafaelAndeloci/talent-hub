import bcrypt from 'bcrypt';
import { config } from '../config/environment';

export default class Hasher {
    public static hash = async (password: string) =>
        await bcrypt.hash(password, config.security.password.hashSalt);

    public static compare = async (password: string, hash: string) =>
        await bcrypt.compare(password, hash);

    public static genRandomToken = () =>
        bcrypt.hash(Math.random().toString(36).substring(7), config.security.password.hashSalt!);
}
