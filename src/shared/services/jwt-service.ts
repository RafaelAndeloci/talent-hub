import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import UserProps from '../../features/users/types/user-props';

const {
  security: { secret, issuer, audience, expiresIn },
} = config;

const unauthorizeError = {
  code: 401,
  errors: ['Unauthorized'],
};

const jwtService = {
  validateToken: (token: string) => {
    try {
      const decodedToken = jwt.verify(token, secret, {
        issuer: issuer,
        audience: audience,
      });

      if (!decodedToken) {
        return unauthorizeError;
      }
    } catch (error) {
      return unauthorizeError;
    }
  },
  generateToken: (user: UserProps) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const authToken = jwt.sign(payload, secret, {
      issuer: issuer,
      audience: audience,
      expiresIn: `${expiresIn}h`,
    });

    const unixEpochExpiration =
      Math.floor(Date.now() / 1000) + expiresIn * 60 * 60;

    return {
      authToken,
      expiresIn: unixEpochExpiration,
      type: 'Bearer',
    };
  },
};

export default jwtService;
