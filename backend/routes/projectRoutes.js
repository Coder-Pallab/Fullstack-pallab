import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { uploadProjectImage } from '../config/cloudinary.js';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Fault-tolerant upload middleware wrapper
const handleUpload = (req, res, next) => {
    uploadProjectImage.single('image')(req, res, (err) => {
        if (err) { console.error('Project image upload error:', err.message); req.file = null; }
        next();
    });
};

router.get('/',                   getProjects);
router.post('/',   protect, handleUpload, createProject);
router.put('/:id', protect, handleUpload, updateProject);
router.delete('/:id', protect,            deleteProject);

export default router;
