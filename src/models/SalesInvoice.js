// backend/models/SalesInvoice.js
import mongoose from 'mongoose';

const invoiceLineSchema = new mongoose.Schema({
  chargeCode: { type: String, required: true },
  chargeName: String,
  currency: String,
  amount: Number,
  uom: String,
  rate: Number,
  curValue: Number,
  exRate: Number,
  value: Number,
  tax1Code: String,
  tax1Rate: Number,
  tax1Value: Number,
  tax2Code: String,
  tax2Rate: Number,
  tax2Value: Number,
  narration: String,
  round: Number,
  curNetValue: Number,
  netValue: Number,
  serialNo: Number
});

const salesInvoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true, required: true },
  currency: String,
  payMode: { type: String, enum: ['Cash', 'Credit'], default: 'Credit' },
  userType: { type: String, enum: ['Shipper', 'Consignee', 'Other'], default: 'Consignee' },
  invoiceType: { type: String, enum: ['Invoice', 'Debit Note', 'Miscellaneous'], default: 'Invoice' },
  invoiceDate: { type: Date, required: true },

  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeaImportJob', required: true },
  jobNum: String,
  doId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryOrder', required: true },
  doNum: String,
  houseBl: String,

  // Customer
  customerCode: String,
  customerName: String,
  address: String,
  city: String,
  country: String,

  // Job Details
  containerInfo: String,
  vesselCode: String,
  vesselName: String,
  portOfLoadingCode: String,
  portOfLoadingName: String,
  voyage: String,
  noOfPackages: String,
  contactDetails: String,
  remarks: String,
  customerRefNo: String,

  // Invoice Lines
  invoiceLines: [invoiceLineSchema],

  // Bank Info
  bankCode: String,
  bankName: String,
  branchCode: String,
  swiftCode: String,
  accountName: String,
  accountAddress: String,
  accountStreet: String,
  accountCity: String,
  accountNumber: String,

  paymentNotes: String,

  // Totals
  totalAmount: Number,
  createdBy: String,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

// Auto-generate Invoice No
salesInvoiceSchema.pre('validate', async function(next) {
  if (this.isNew && (!this.invoiceNo || this.invoiceNo === '[AUTO-GENERATED]')) {
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `SFI/DNUFL/${year}/`;
    
    try {
      // Find the invoice with the highest sequence number for this prefix
      const lastInvoice = await this.constructor.findOne(
        { invoiceNo: new RegExp(`^${prefix}`) },
        { invoiceNo: 1 },
        { sort: { invoiceNo: -1 } }
      );

      let nextSeq = 1;
      if (lastInvoice) {
        const parts = lastInvoice.invoiceNo.split('/');
        const lastSeq = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(lastSeq)) {
          nextSeq = lastSeq + 1;
        }
      }

      const padded = String(nextSeq).padStart(7, '0');
      this.invoiceNo = `${prefix}${padded}`;
    } catch (err) {
      console.error('Error generating invoice number:', err);
    }
  }
  next();
});

export default mongoose.model('SalesInvoice', salesInvoiceSchema);