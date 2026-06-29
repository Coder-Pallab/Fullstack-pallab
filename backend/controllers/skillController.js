import Skill from '../models/Skill.js';
import { cloudinary, configureCloudinary } from '../config/cloudinary.js';

// GET /api/skills
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/skills
export const createSkill = async (req, res) => {
    try {
        const { name, level, category } = req.body;

        const skill = new Skill({
            name,
            level,
            category,
            icon: req.file ? req.file.path : req.body.icon || '',
        });

        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /api/skills/:id
export const updateSkill = async (req, res) => {
    try {
        const existing = await Skill.findById(req.params.id);
        if (!existing) return res.status(404).json({ message: 'Skill not found' });

        const { name, level, category } = req.body;

        // Delete old Cloudinary icon if a new one was uploaded
        if (req.file && existing.icon && existing.icon.includes('cloudinary')) {
            configureCloudinary();
            const publicId = existing.icon.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        const updated = await Skill.findByIdAndUpdate(
            req.params.id,
            {
                name: name || existing.name,
                level: level !== undefined ? level : existing.level,
                category: category || existing.category,
                icon: req.file ? req.file.path : req.body.icon || existing.icon,
            },
            { returnDocument: 'after' }
        );

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/skills/:id
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (skill.icon && skill.icon.includes('cloudinary')) {
            configureCloudinary();
            const publicId = skill.icon.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
