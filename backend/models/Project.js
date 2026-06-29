import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    url: { type: String },
    code: { type: String }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
