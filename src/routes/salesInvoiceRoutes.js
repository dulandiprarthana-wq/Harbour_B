// backend/routes/salesInvoiceRoutes.js
import express from 'express';
import {
  createSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoice
} from '../controllers/salesInvoiceController.js';

const router = express.Router();

router.post('/createInvoice', createSalesInvoice);
router.get('/getAllInvoices', getAllSalesInvoices);
router.get('/getInvoice/:id', getSalesInvoice);

export default router;