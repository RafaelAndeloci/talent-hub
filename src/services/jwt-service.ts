import config from '../config/environment';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import AuthTokenProps from '../api/users/types/auth-token-props';

const {
  security: { secret, issuer, audience, expiresIn },
} = config;

const unauthorizeError = {
  code: 401,
  errors: ['Unauthorized'],
};

type JwtService = {
  validateToken: (token: string) => {
    isValid: boolean;
    error: typeof unauthorizeError | null;
  };
  generateToken: (user: User) => AuthTokenProps;
};

const jwtService: JwtService = {
  validateToken: token => {
    try {
      const decodedToken = jwt.verify(token, secret, {
        issuer: issuer,
        audience: audience,
      });

      if (!decodedToken) {
        return { isValid: false, error: unauthorizeError };
      }

      return { isValid: true, error: null };
    } catch (error) {
      return { isValid: false, error: unauthorizeError };
    }
  },
  generateToken: user => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, secret, {
      issuer: issuer,
      audience: audience,
      expiresIn: `${expiresIn}h`,
    });

    const unixEpochExpiration =
      Math.floor(Date.now() / 1000) + expiresIn * 60 * 60;

    const authToken: AuthTokenProps = {
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: unixEpochExpiration,
    };

    return authToken;
  },
};

export default jwtService;
