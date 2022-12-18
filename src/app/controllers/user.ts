//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');

import { User } from '../datamappers/index.js';
import { ErrorApi } from '../services/errorHandler.js';

//~ Controller methods
const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const doSignIn = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const userExist = await User.findByName(name);

    if (password !== userExist['password']) throw new ErrorApi(`Name or password is wrong, please retry !`, req, res, 401);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ['password']: remove, ...user } = userExist;

    req.session.user = user;
    //~ Result
    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { fetchAllUsers, doSignIn };
