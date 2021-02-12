import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserService();

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

        const UpdateAvatarUser = new UpdateAvatarUserService()
        const user = await UpdateAvatarUser.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        })
        delete user.password;

        return response.json(user);

    },
);

export default usersRouter;
