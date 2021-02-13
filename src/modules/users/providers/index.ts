import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implemantations/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
    'HashProvider', BCryptHashProvider
);
