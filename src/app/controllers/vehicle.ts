//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');

import { Vehicle } from '../datamappers/index.js';
// import { ErrorApi } from '../services/errorHandler.js';

//~ Controller methods
const fetchAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.findAll();
    return res.status(200).json(vehicles);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { fetchAllVehicles };
