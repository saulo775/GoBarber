import { Request, Response } from 'express';
import { container } from 'tsyringe'

import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

export default class UserAvatarController {
    public async Update(request: Request, response: Response): Promise<Response> {
        const UpdateAvatarUser = container.resolve(UpdateAvatarUserService)

        const user = await UpdateAvatarUser.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        })
        delete user.password;

        return response.json(user);
    }
}
