import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../environments';

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes: string[] = []
): Promise<any> => {
  const errorMessage = 'Missing or Invalid Token';
  if (securityName === 'api_key') {
    const token: string = (request.query.access_token as string) || '';
    return new Promise((resolve, reject) => {
      if (token) {
        resolve({ token });
      } else {
        reject(new Error(errorMessage));
      }
    });
  }

  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error(errorMessage));
      }
      const decoded: any = jwt.verify(token, JWT_SECRET);

      if (!decoded) {
        reject(new Error(errorMessage));
      }

      for (const scope of scopes) {
        if (!decoded.scopes.includes(scope)) {
          reject(new Error('JWT does not contain required scope.'));
        }
      }

      resolve(decoded);
    });
  }
};
