import * as express from 'express';
import { hello } from '../controllers/testController';

const router = express.Router();

router.get('test', hello);

export default router;
