import { Router } from 'express';

import * as saleCtrl from '../controllers/sale.controller.js';
import { authJwt } from '../middlewares/index.js';
const router = Router();

router.post(
  '/',
  [
    authJwt.verifyToken,
    authJwt.isVerifiedUser
  ],
  saleCtrl.createSale
);

router.get(
  '/',
  saleCtrl.getSales
);

export default router;