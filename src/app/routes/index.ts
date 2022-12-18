import { Router } from 'express';
const router = Router();

//~ Main
import { router as mainRouter } from './main.js';
router.use(mainRouter);

//~ User
import { router as userRouter } from './user.js';
router.use(userRouter);

//~ Vehicle
import { router as vehicleRouter } from './vehicle.js';
router.use(vehicleRouter);

//~ Rental
import { router as rentalRouter } from './rental.js';
router.use(rentalRouter);

//~ Export router
export { router };