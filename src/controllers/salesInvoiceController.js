// backend/controllers/salesInvoiceController.js
import SalesInvoice from '../models/SalesInvoice.js';

export const createSalesInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    // Optional: calculate total
    const total = invoiceData.invoiceLines?.reduce((sum, line) => sum + Number(line.netValue || 0), 0) || 0;
    invoiceData.totalAmount = total;
    invoiceData.createdBy = req.user?.username;

    const invoice = await SalesInvoice.create(invoiceData);

    res.status(201).json({
      success: true,
      data: invoice,
      message: 'Sales Invoice created successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllSalesInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find()
      .populate('jobId')
      .populate('doId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await SalesInvoice.findById(id)
      .populate('jobId')
      .populate('doId');
    if (!invoice) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};