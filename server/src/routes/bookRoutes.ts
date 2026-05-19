import { Router } from 'express';
import { search } from '../controllers/searchController';
import { getWork } from '../controllers/workController';
import { recommend } from '../controllers/recommendController';

const router = Router();

router.get('/search', search);
router.get('/work', getWork);
router.post('/recommend', recommend);

export default router;
