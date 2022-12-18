import { Router } from 'express';
const router = Router();
import { fetchAllRentals, rentAVehicle, updateRental, deleteRental } from '../controllers/rental.js';
import { auth } from '../middlewares/auth.js';
router.get('/api/v1/rentals', fetchAllRentals);
router.post('/api/v1/rentals', auth, rentAVehicle);
router.patch('/api/v1/rentals/:rentalId(\\d+)', auth, updateRental);
router.delete('/api/v1/rentals/:rentalId(\\d+)', auth, deleteRental);
//~ Export router
export { router };
//# sourceMappingURL=rental.js.map