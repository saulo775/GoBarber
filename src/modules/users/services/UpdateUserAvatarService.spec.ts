import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import UpdateUserAvatarService from './UpdateAvatarUserService';
import UpdateAvatarUserService from './UpdateAvatarUserService';

describe('UpdateUserAvatar', () => {
   it('should be able to update avatar user ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider()

    const UpdateUserAvatar = new UpdateAvatarUserService(
        fakeUsersRepository,
        fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
    })

    await UpdateUserAvatar.execute({
        user_id: user.id,
        avatar_filename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
   });


   it('should not be able to update avatar from not existing user ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider()

    const UpdateUserAvatar = new UpdateAvatarUserService(
        fakeUsersRepository,
        fakeStorageProvider
    );

    expect(
        UpdateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatar_filename: 'avatar.jpg',
        }),
    ).rejects.toBeInstanceOf(AppError);
   });

   it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const UpdateUserAvatar = new UpdateAvatarUserService(
        fakeUsersRepository,
        fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
    })

    await UpdateUserAvatar.execute({
        user_id: user.id,
        avatar_filename: 'avatar.jpg',
    });

    await UpdateUserAvatar.execute({
        user_id: user.id,
        avatar_filename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
   });

});
