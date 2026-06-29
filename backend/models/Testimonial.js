import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String }, // E.g., 'Client', 'Colleague'
    comment: { type: String, required: true },
    approved: { type: Boolean, default: false } // For moderation, so you can approve comments before they show on frontend
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
