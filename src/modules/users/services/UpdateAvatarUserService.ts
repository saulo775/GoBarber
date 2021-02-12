import path from 'path';
import fs from 'fs'
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';




interface IRequest {
    user_id: string;
    avatar_filename: string;
}

@injectable()
class UpdateAvatarUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {};

    public async execute({user_id, avatar_filename}: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatar_filename;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateAvatarUserService;
