// backend/controllers/seaImportJobController.js
import SeaImportJob from '../models/SeaImportJob.js';

// CREATE Job
export const createJob = async (req, res) => {
  try {
    const { jobNum, mblNumber, containers } = req.body;

    // Required fields
    if (!jobNum) return res.status(400).json({ success: false, message: 'Job Number is required' });
    if (!mblNumber) return res.status(400).json({ success: false, message: 'MBL Number is required' });
    if (!containers || containers.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one container is required' });
    }

    // Check duplicate job number
    const existingJob = await SeaImportJob.findOne({ jobNum });
    if (existingJob) return res.status(400).json({ success: false, message: 'Job Number already exists' });

    // Check duplicate MBL
    const existingMBL = await SeaImportJob.findOne({ mblNumber });
    if (existingMBL) return res.status(400).json({ success: false, message: 'MBL Number already exists' });

    // Check duplicate container numbers
    const containerNos = containers.map(c => c.containerNo);
    const duplicates = containerNos.filter((item, index) => containerNos.indexOf(item) !== index);
    if (duplicates.length > 0) {
      return res.status(400).json({ success: false, message: `Duplicate container numbers: ${duplicates.join(', ')}` });
    }

    const job = new SeaImportJob(req.body);
    await job.save();

    // Populate all references
    await job.populate([
      'vesselId', 'portDepartureId', 'portDischargeId', 'portOfLoadingId',
      'originAgentId', 'carrierId', 'shipAgentId', 'principleCustomerId', 'localAgentId'
    ]);

    res.status(201).json({
      success: true,
      data: job,
      message: 'Sea Import Job created successfully with containers'
    });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await SeaImportJob.find()
      .populate('vesselId', 'code name')
      .populate('portDepartureId portDischargeId portOfLoadingId', 'code name')
      .populate('originAgentId carrierId shipAgentId principleCustomerId localAgentId', 'code name type')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent changing jobNum
    delete updates.jobNum;

    // Validate MBL if changed
    if (updates.mblNumber) {
      const existing = await SeaImportJob.findOne({ 
        mblNumber: updates.mblNumber, 
        _id: { $ne: id } 
      });
      if (existing) return res.status(400).json({ success: false, message: 'MBL Number already in use' });
    }

    const job = await SeaImportJob.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate([
      'vesselId', 'portDepartureId', 'portDischargeId', 'portOfLoadingId',
      'originAgentId', 'carrierId', 'shipAgentId', 'principleCustomerId', 'localAgentId'
    ]);

    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    res.json({ success: true, data: job, message: 'Job updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};