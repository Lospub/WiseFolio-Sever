import { Injectable } from '@nestjs/common';
import { firebaseAuth } from '../../firebase-admin.config';
import knex from 'knex';
import config from '../../knexfile';

const db = knex(config.development);

@Injectable()
export class UserService {
    // Sign up a new user
    async signUp(email: string, name: string, password: string) {
        // Create user in Firebase Authentication
        const firebaseUser = await firebaseAuth.createUser({
            email,
            password,
        });

        // Save the user in the MySQL database
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
        // Use Firebase REST API to authenticate the user and get an idToken
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

    // Get user by email
    async getUserByEmail(email: string) {
        if (!email) {
            throw new Error('Email is required');
        }
    
        const user = await db('users').where({ email }).first();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    
}
