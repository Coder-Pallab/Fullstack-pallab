import Testimonial from '../models/Testimonial.js';

// GET /api/testimonials  (approved only - public)
export const getApprovedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/testimonials/all  (admin only)
export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/testimonials  (public - visitors submit their comments)
export const createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PATCH /api/testimonials/:id/approve  (admin only)
export const approveTestimonial = async (req, res) => {
    try {
        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { returnDocument: 'after' }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/testimonials/:id  (admin only)
export const deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
