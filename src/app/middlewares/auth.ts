//~ Import module
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response, NextFunction } from 'express';

//~ Authentication
const auth = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session.user) throw new ErrorApi(`User not connected !`, req, res, 401);
  
    next();
}
export { auth };