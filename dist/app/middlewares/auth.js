//~ Import module
import { ErrorApi } from '../services/errorHandler.js';
//~ Authentication
const auth = (req, res, next) => {
    if (!req.session.user)
        throw new ErrorApi(`User not connected !`, req, res, 401);
    next();
};
export { auth };
//# sourceMappingURL=auth.js.map