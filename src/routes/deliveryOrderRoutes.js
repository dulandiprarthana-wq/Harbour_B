// backend/routes/deliveryOrderRoutes.js
import express from 'express';
import {
  createDeliveryOrder,
  getDeliveryOrder,
  getAllDeliveryOrders
} from '../controllers/deliveryOrderController.js';

const router = express.Router();

router.post('/createDO', createDeliveryOrder);
router.get('/getAllDOs', getAllDeliveryOrders);
router.get('/getDO/:id', getDeliveryOrder);

export default router;