import { Router } from 'express';
const router = Router();

import { fetchAllVehicles } from '../controllers/vehicle.js';

router.get('/api/v1/vehicles', fetchAllVehicles);

//~ Export router
export { router };