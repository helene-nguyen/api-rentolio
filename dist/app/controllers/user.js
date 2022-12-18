var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import debug from 'debug';
const logger = debug('Controller');
import { User } from '../datamappers/index.js';
import { ErrorApi } from '../services/errorHandler.js';
//~ Controller methods
const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const doSignIn = async (req, res) => {
    try {
        const { name, password } = req.body;
        const userExist = await User.findByName(name);
        if (password !== userExist['password'])
            throw new ErrorApi(`Name or password is wrong, please retry !`, req, res, 401);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ['password']: remove } = userExist, user = __rest(userExist, ['password']);
        req.session.user = user;
        //~ Result
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { fetchAllUsers, doSignIn };
//# sourceMappingURL=user.js.map