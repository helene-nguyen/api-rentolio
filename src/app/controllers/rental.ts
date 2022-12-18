//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');

import { addHours } from '../utils/addHours.js';
import { Rental, Vehicle } from '../datamappers/index.js';
import { ErrorApi } from '../services/errorHandler.js';

//~ Controller Methods
const fetchAllRentals = async (req: Request, res: Response) => {
  try {
    const rentals = await Rental.findAll();
    return res.status(200).json(rentals);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const rentAVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicle_id, option } = req.body;
    const { id: user_id } = req.session.user;
    const targetVehicle = await Vehicle.findOne(vehicle_id);

    if (targetVehicle.is_booked) throw new ErrorApi(`This vehicle is already rent !`, req, res, 401);

    const returned_at = addHours(option); // add option on current date
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
    let { ['option']: remove, ...rental } = req.body;
    rental = { user_id, ...rental, returned_at };

    //~ Create rental
    const isCreated = await Rental.create(rental);

    //~ Result
    if (isCreated) return res.status(201).json(`Rental successfully created !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const updateRental = async (req: Request, res: Response) => {
  try {
    const rentalId = +req.params.rentalId;
    const { id } = req.session.user;
    const { vehicle_id, option } = req.body;

    const targetRentalExist = await Rental.findOne(rentalId);
    // Control if rental concern the right user
    if (!targetRentalExist || id !== targetRentalExist.user_id) throw new ErrorApi(`Given informations not allow any modification`, req, res, 403);

    // Control vehicle concerned is not rent
    if (vehicle_id) {
      const targetVehicle = await Vehicle.findOne(vehicle_id);
      if (targetVehicle.is_booked) throw new ErrorApi(`This vehicle is already rent !`, req, res, 401);
    }

    const returned_at = addHours(option); // add option on current date
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
    let { ['option']: remove, ...updatedRental } = req.body;

    updatedRental = { id: rentalId, user_id: id, vehicle_id, ...updatedRental, rent_at: new Date(), returned_at };

    const isUpdated = await Rental.update(updatedRental);
    if (isUpdated) return res.status(200).json(`Rental successfully updated`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const deleteRental = async (req: Request, res: Response) => {
  try {
    const rentalId = +req.params.rentalId;
    const { id } = req.session.user;

    const targetRentalExist = await Rental.findOne(rentalId);

    // Control if rental exist or concern the right user
    if (!targetRentalExist || id !== targetRentalExist.user_id) throw new ErrorApi(`Given informations not allow any modification`, req, res, 403);

    const isDeleted = await Rental.delete(rentalId);

    //~ Result
    if (isDeleted) return res.status(200).json(`Rental successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { fetchAllRentals, rentAVehicle, updateRental, deleteRental };
