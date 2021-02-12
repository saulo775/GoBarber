import 'reflect-metadata';

import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
})


app.get('/', (request, response) => {
    return response.json({ message: 'hello world!!!' });
});

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('server is running on port 3333!!!');
});
