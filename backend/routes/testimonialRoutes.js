import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
    getApprovedTestimonials,
    getAllTestimonials,
    createTestimonial,
    approveTestimonial,
    deleteTestimonial,
} from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/',              getApprovedTestimonials);   // public
router.get('/all', protect,  getAllTestimonials);          // admin
router.post('/',             createTestimonial);           // public (visitor submit)
router.patch('/:id/approve', protect, approveTestimonial); // admin
router.delete('/:id',        protect, deleteTestimonial);  // admin

export default router;
