import Project from '../models/Project.js';
import { cloudinary, configureCloudinary } from '../config/cloudinary.js';

// GET /api/projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/projects
export const createProject = async (req, res) => {
    try {
        const { title, description, tags, url, code } = req.body;
        const tagsArray = tags ? tags.split(',').map(t => t.trim()) : [];

        const project = new Project({
            title,
            description,
            tags: tagsArray,
            url,
            code,
            image: req.file ? req.file.path : req.body.image || '',
        });

        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /api/projects/:id
export const updateProject = async (req, res) => {
    try {
        const existing = await Project.findById(req.params.id);
        if (!existing) return res.status(404).json({ message: 'Project not found' });

        const { title, description, tags, url, code } = req.body;
        const tagsArray = tags ? tags.split(',').map(t => t.trim()) : existing.tags;

        // Delete old Cloudinary image if a new one was uploaded
        if (req.file && existing.image && existing.image.includes('cloudinary')) {
            configureCloudinary();
            const publicId = existing.image.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title: title || existing.title,
                description: description || existing.description,
                tags: tagsArray,
                url: url || existing.url,
                code: code || existing.code,
                image: req.file ? req.file.path : req.body.image || existing.image,
            },
            { returnDocument: 'after' }
        );

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (project.image && project.image.includes('cloudinary')) {
            configureCloudinary();
            const publicId = project.image.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
