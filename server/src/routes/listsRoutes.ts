import { Router } from 'express';
import { getLists, updateLists } from '../controllers/listsController';

const router = Router();

router.get('/lists', getLists);
router.put('/lists', updateLists);

export default router;
