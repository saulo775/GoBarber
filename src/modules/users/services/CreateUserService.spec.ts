import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;



describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider()
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    })


   it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Fulano',
            email: 'Fulano@gmail.com',
            password: '123456'

        });
        expect(user).toHaveProperty('id');
   });

    it('should not to be able to create a new user with same email from another', async () => {

        await createUser.execute({
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
