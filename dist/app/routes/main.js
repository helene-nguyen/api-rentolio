import { Router } from 'express';
const router = Router();
import { renderHomeMessage } from '../controllers/main.js';
router.get('/api/v1', renderHomeMessage);
//~ Export router
export { router };
//# sourceMappingURL=main.js.map