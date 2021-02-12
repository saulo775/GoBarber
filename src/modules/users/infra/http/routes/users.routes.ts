import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const CreateUser = new CreateUserService(usersRepository);

    const user = await CreateUser.execute({
        name,
        email,
        password,
    });
    delete user.password;

    return response.json(user);


});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {

        const usersRepository = new UsersRepository();
        const UpdateAvatarUser = new UpdateAvatarUserService(usersRepository)
        const user = await UpdateAvatarUser.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        })
        delete user.password;

        return response.json(user);

    },
);

export default usersRouter;
