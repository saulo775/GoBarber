import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able authenticate', async () => {
         const fakeUsersRepository = new FakeUsersRepository();
         const createUser = new CreateUserService(fakeUsersRepository);
         const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

         await createUser.execute({
             name: 'Fulano',
             email: 'Fulano@gmail.com',
             password: '123456'
         });

         const response = await authenticateUser.execute({
            email: 'Fulano@gmail.com',
            password: '123456'
        });
         expect(response).toHaveProperty('token');
    });
 });
