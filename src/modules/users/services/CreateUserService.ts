import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    constructor(private usersRepository: IUsersRepository) {};

    public async execute({name, email, password }: IRequest): Promise<User>{

       const checkUserEmailExists = await this.usersRepository.findByEmail(email)

       if( checkUserEmailExists ){
           throw new AppError('Email already Used', 400);
       }

       const hashedPassword = await hash(password, 8);

       const user = await this.usersRepository.create({
           name,
           email,
           password: hashedPassword,
       });


       return user;

    }

}


export default CreateUserService;
