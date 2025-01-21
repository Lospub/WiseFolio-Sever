import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAuth } from '../../firebase-admin.config';
import knex from 'knex';
import config from '../../knexfile';

const db = knex(config.development);

@Injectable()
export class UserService {
    // Sign up a new user
    async signUp(email: string, name: string, password: string) {
        const firebaseUser = await firebaseAuth.createUser({
            email,
            password,
        });

        const newUser = {
            id: firebaseUser.uid,
            email,
            name,
        };
        await db('users').insert(newUser);

        return { id: newUser.id, email: newUser.email, name: newUser.name };
    }

    // Login a user
    async login(email: string, password: string): Promise<string> {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, returnSecureToken: true }),
            },
        );

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        return data.idToken;
    }

    // Get user by ID
    async findUserById(userId: string) {
        if (!userId) {
            throw new Error('User ID is required');
        }
    
        const user = await db('users').where({ id: userId }).first();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    // Update username and/or password
    async updateUser(userId: string, newName?: string, newPassword?: string) {
        if (newPassword) {
            await firebaseAuth.updateUser(userId, { password: newPassword });
        }

        if (newName) {
            await db('users').where({ id: userId }).update({ name: newName, updated_at: new Date() });
        }

        const updatedUser = await db('users').where({ id: userId }).first();
        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    }

    // decode idToken
    async decodeIdToken(idToken: string): Promise<string> {
        try {
            const decodedToken = await firebaseAuth.verifyIdToken(idToken);
            return decodedToken.uid;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
