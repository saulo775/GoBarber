import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User'

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, password }: Request): Promise<User>{
       const UsersRepository = getRepository(User);

       const checkUserEmailExists = await UsersRepository.findOne({
           where: { email },
       });

       if( checkUserEmailExists ){
           throw new AppError('Email already Used', 400);
       }

       const hashedPassword = await hash(password, 8);

       const user = UsersRepository.create({
           name,
           email,
           password: hashedPassword,
       });

       await UsersRepository.save(user);

       return user;

    }

}


export default CreateUserService;
