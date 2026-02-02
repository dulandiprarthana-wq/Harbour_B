import SeaImportJob from '../models/SeaImportJob.js';
import ExportJob from '../models/ExportJob.js';
import CanadaHBL from '../models/CanadaHBL.js';
import SalesInvoice from '../models/SalesInvoice.js';
import DeliveryOrder from '../models/DeliveryOrder.js';

export const getDashboardStats = async (req, res) => {
  try {
    // 1. Operational Counts
    const seaImportCount = await SeaImportJob.countDocuments();
    const exportCount = await ExportJob.countDocuments();
    const canadaHblCount = await CanadaHBL.countDocuments();
    
    // 2. Financial Metrics
    const invoices = await SalesInvoice.find();
    const totalRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0);
    const outstandingInvoices = invoices.filter(inv => inv.status === 'Active').length;

    // 3. Recent Jobs (Combined list)
    const recentSeaImport = await SeaImportJob.find().sort({ createdAt: -1 }).limit(3).lean();
    const recentExport = await ExportJob.find().sort({ createdAt: -1 }).limit(3).lean();
    
    const recentJobs = [
      ...recentSeaImport.map(j => ({ ...j, type: 'Sea Import', ref: j.jobNum })),
      ...recentExport.map(j => ({ ...j, type: 'Export', ref: j.jobNum }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    // 4. Monthly Distribution (For Pie Chart)
    const jobDistribution = [
      { name: 'Sea Import', value: seaImportCount },
      { name: 'Export', value: exportCount },
      { name: 'Canada Manifest', value: canadaHblCount }
    ];

    // 5. Revenue Trend (Last 6 months placeholder)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueTrend = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      revenueTrend.push({
        name: monthNames[d.getMonth()],
        revenue: Math.floor(Math.random() * 500000) + 100000 // Placeholder data
      });
    }

    res.json({
      success: true,
      data: {
        summary: {
          seaImportCount,
          exportCount,
          canadaHblCount,
          totalRevenue,
          outstandingInvoices,
          totalJobs: seaImportCount + exportCount + canadaHblCount
        },
        recentJobs,
        jobDistribution,
        revenueTrend
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
