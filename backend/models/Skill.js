import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    icon: { type: String }, // Can be a URL or class name for icon
    category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
