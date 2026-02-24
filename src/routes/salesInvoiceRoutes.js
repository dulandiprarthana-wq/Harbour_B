// backend/routes/salesInvoiceRoutes.js
import express from 'express';
import {
  createSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoice
} from '../controllers/salesInvoiceController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/createInvoice', protect, createSalesInvoice);
router.get('/getAllInvoices', getAllSalesInvoices);
router.get('/getInvoice/:id', getSalesInvoice);

export default router;