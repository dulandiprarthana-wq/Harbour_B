import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes.js';
import customerSupplierRoutes from './routes/CustomerSupplier.js'; 
import currencyRoutes from './routes/currency.js';
import uomRoutes from './routes/uom.js';
import bankRoutes from './routes/bank.js';
import taxRoutes from './routes/tax.js';
import chargeRoutes from './routes/chargeRoutes.js';

import vesselRoutes from './routes/vessel.js';
import flightRoutes from './routes/flight.js';
import seaDestinationRoutes from './routes/seaDestination.js';
import airDestinationRoutes from './routes/airDestination.js';

import seaImportJobRoutes from './routes/seaImportJob.js';
import userRoutes from './routes/userRoutes.js';

import deliveryOrderRoutes from './routes/deliveryOrderRoutes.js';
import salesInvoiceRoutes from './routes/salesInvoiceRoutes.js';

// NEW: Export routes
import exportJobRoutes from './routes/exportJobRoutes.js';

import canadaRoutes from './routes/canadaRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:3000','http://localhost:3000/', 'https://leafy-lebkuchen-d01b7a.netlify.app', 'https://leafy-lebkuchen-d01b7a.netlify.app/', 'https://transcorp-canada.netlify.app', 'https://transcorp-canada.netlify.app/',],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customersuppliers', customerSupplierRoutes); 
app.use('/api/currencies', currencyRoutes);
app.use('/api/uoms', uomRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/charges', chargeRoutes);

app.use('/api/vessels', vesselRoutes); 
app.use('/api/flights', flightRoutes);
app.use('/api/sea-destinations', seaDestinationRoutes);
app.use('/api/air-destinations', airDestinationRoutes);

app.use('/api/jobs/sea-import', seaImportJobRoutes);

// NEW: Export jobs route
app.use('/api/jobs/sea-export', exportJobRoutes);

app.use('/api/users', userRoutes);

app.use('/api/delivery-orders', deliveryOrderRoutes);
app.use('/api/sales-invoices', salesInvoiceRoutes);

app.use('/api/canada', canadaRoutes);
app.use('/api/stats', statsRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('DB Connection Error:', err.message);
    process.exit(1);
  });

export default app;