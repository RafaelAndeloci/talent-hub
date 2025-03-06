import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { UserDto } from '@talent-hub/shared';

const {
    security: { secret, issuer, audience, expiresIn },
} = config;

export default class JwtService {
    private static readonly tokenExpirationSeconds = expiresIn * 60 * 60;

    public static authenticateToken = (token: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwt.verify(token, secret, {
            issuer,
            audience,
            algorithms: ['HS256'],
        });

        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            profilePictureUrl: decoded.profilePictureUrl,
        } as UserDto;
    };

    public static generateToken = (user: UserDto) => {
        const token = jwt.sign(user, secret, {
            issuer,
            audience,
            expiresIn: `${JwtService.tokenExpirationSeconds}s`,
            algorithm: 'HS256',
        });

        const unixEpochExpiration = Math.floor(Date.now() / 1000) + JwtService.tokenExpirationSeconds;

        return {
            accessToken: token,
            tokenType: 'Bearer',
            expiresIn: unixEpochExpiration,
        };
    };
}