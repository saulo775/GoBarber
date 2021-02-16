
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import ListProviderService from './ListProviderService';


let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProviderService(fakeUsersRepository);
    })


    it('should be able to list the providers', async () => {

        const user_1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const user_2 = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123456'
        })
        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '123456'
        })

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([
            user_1,
            user_2
        ]);
     });

});
