import config from '../config/environment';
import jwt from 'jsonwebtoken';
import AuthTokenProps from '../api/users/types/auth-token-props';
import User from '../api/users/types/user';

const {
  security: { secret, issuer, audience, expiresIn },
} = config;

const jwtService = {
  authenticateToken: (token: string) => {
    try {
      const decoded: any = jwt.verify(token, secret, {
        issuer,
        audience,
        algorithms: ['HS256'],
      });
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        profilePictureUrl: decoded.profilePictureUrl,
      } as User;
    } catch (error) {
      return null;
    }
  },

  generateToken: (user: User) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      profilePictureUrl: user.profilePictureUrl,
    };

    const seconds = expiresIn * 60 * 60;

    const token = jwt.sign(payload, secret, {
      issuer,
      audience,
      expiresIn: seconds,
      algorithm: 'HS256',
    });

    const unixEpochExpiration = Math.floor(Date.now() / 1000) + seconds;

    const authToken: AuthTokenProps = {
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: unixEpochExpiration,
    };

    return authToken;
  },
};

export default jwtService;
