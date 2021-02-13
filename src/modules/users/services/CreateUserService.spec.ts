import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
   it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'Fulano',
            email: 'Fulano@gmail.com',
            password: '123456'

        });
        expect(user).toHaveProperty('id');
   });
});

describe('CreateUser', () => {
    it('should not to be able to create a new user with same email from another', async () => {
         const fakeUsersRepository = new FakeUsersRepository();
         const fakeHashProvider = new FakeHashProvider()
         const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

         const user = await createUser.execute({
             name: 'Fulano',
             email: 'Fulano@gmail.com',
             password: '123456'
         });

         await expect(
            createUser.execute({
                name: 'Fulano',
                email: 'Fulano@gmail.com',
                password: '123456'
            })
         ).rejects.toBeInstanceOf(AppError);
    });
 });
