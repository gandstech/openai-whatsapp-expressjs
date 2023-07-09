import { Router } from 'express';
import webhook from './webhook';

const route = Router();


route.use('/webhook', webhook);

export default route;