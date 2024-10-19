import * as express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { swaggerDef } from '../../docs/swaggerDefinition';

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: swaggerDef,
  apis: ['src/docs/*.yml', 'src/routes/api.*.ts'],
});

router.use('/doc', swaggerUi.serve);
router.get(
  '/docc',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

export default router;