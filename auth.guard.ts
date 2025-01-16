import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { firebaseAuth } from './firebase-admin.config';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token) return false;

        try {
            const decodedToken = await firebaseAuth.verifyIdToken(token);
            request.user = decodedToken;
            return true;
        } catch (error) {
            return false;
        }
    }
}
