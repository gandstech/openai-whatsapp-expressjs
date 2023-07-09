import { Router } from 'express';
import { facebookWebhook, facebookWebhookVerify } from '../service/webhook';

const route = Router();

route.get('/facebook', facebookWebhookVerify);
route.post('/facebook', facebookWebhook);

export default route;