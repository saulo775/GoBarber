import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const CreateUser = container.resolve(CreateUserService);

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
        const UpdateAvatarUser = container.resolve(UpdateAvatarUserService)

        const user = await UpdateAvatarUser.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        })
        delete user.password;

        return response.json(user);

    },
);

export default usersRouter;
