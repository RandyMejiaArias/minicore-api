import { Router } from 'express';

import * as productCtrl from '../controllers/product.controller.js';
const router = Router();

router.get(
  '/',
  productCtrl.getProducts
);

router.post(
  '/',
  productCtrl.createProduct
);

export default router;