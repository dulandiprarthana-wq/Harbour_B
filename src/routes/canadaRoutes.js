// backend/routes/canadaRoutes.js
import express from 'express';
import { createManifest, getAllManifests, updateHBLCharges, updateHBL } from '../controllers/canadaController.js';

const router = express.Router();

router.post('/createManifest', createManifest);
router.get('/getAllManifests', getAllManifests);
router.put('/updateHBLCharges/:manifestId/:hblNumber', updateHBLCharges);
router.put('/updateHBL/:manifestId/:hblId', updateHBL);

export default router;