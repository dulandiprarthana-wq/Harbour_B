// backend/controllers/receivableController.js
import Receipt from '../models/Receipt.js';

// Generate receipt number
const generateReceiptNo = async () => {
  const count = await Receipt.countDocuments();
  const num = String(count + 1).padStart(4, '0');
  return `REC-${new Date().getFullYear()}-${num}`;
};

export const createReceipt = async (req, res) => {
  try {
    const { invoiceId, invoiceType, paidAmount, pendingAmount, date } = req.body;

    // Date validation (no past dates)
    const today = new Date().setHours(0, 0, 0, 0);
    const submitted = new Date(date).setHours(0, 0, 0, 0);
    if (submitted < today) {
      return res.status(400).json({ success: false, message: 'Date cannot be in the past' });
    }

    const receiptNo = await generateReceiptNo();

    const newReceipt = await Receipt.create({
      invoiceId,
      invoiceType,
      receiptNo,
      paidAmount: Number(paidAmount),
      pendingAmount: Number(pendingAmount),
      date: new Date(date)
    });

    res.status(201).json({ success: true, data: newReceipt });
  } catch (err) {
    console.error('createReceipt error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};