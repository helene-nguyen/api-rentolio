import { Router } from 'express';
const router = Router();
import { fetchAllUsers, doSignIn } from '../controllers/user.js';
router.get('/api/v1/users', fetchAllUsers);
router.post('/api/v1/users', doSignIn);
//~ Export router
export { router };
//# sourceMappingURL=user.js.map