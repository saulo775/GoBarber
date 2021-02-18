import { Router } from 'express';
import  { celebrate, Segments, Joi } from 'celebrate';


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailability';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailability';


const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailability()
const providerMonthAvailability = new ProviderMonthAvailability()

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required
        }
    }),
    providerMonthAvailability.index
);
providersRouter.get('/:provider_id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required
        }
    }),
    providerDayAvailability.index
);

export default providersRouter;
