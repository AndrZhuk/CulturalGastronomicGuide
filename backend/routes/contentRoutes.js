import express from 'express';
import { 
  getEstablishments, 
  getRegions, 
  getCountries, 
  getDishes, 
  getDishesByCountry 
} from '../controllers/contentController.js';

const router = express.Router();

router.get('/establishments', getEstablishments);
router.get('/regions', getRegions);
router.get('/countries', getCountries);
router.get('/dishes', getDishes);
router.get('/dishes/:countryName', getDishesByCountry);

export default router;

