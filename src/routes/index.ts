import { Router } from 'express';
import users from './users';

const router = Router();
users(router);

export default router;
