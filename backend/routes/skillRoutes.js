import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { uploadSkillIcon } from '../config/cloudinary.js';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';

const router = express.Router();

// Fault-tolerant upload middleware wrapper
const handleUpload = (req, res, next) => {
    uploadSkillIcon.single('icon')(req, res, (err) => {
        if (err) { console.error('Skill icon upload error:', err.message); req.file = null; }
        next();
    });
};

router.get('/',                   getSkills);
router.post('/',   protect, handleUpload, createSkill);
router.put('/:id', protect, handleUpload, updateSkill);
router.delete('/:id', protect,            deleteSkill);

export default router;
