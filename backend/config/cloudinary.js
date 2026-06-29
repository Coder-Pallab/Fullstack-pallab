import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary lazily so dotenv has already loaded by this point
export const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

// Storage for project images
const getProjectStorage = () => {
    configureCloudinary();
    return new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'portfolio/projects',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 800, height: 500, crop: 'fill' }],
        },
    });
};

// Storage for skill icons
const getSkillStorage = () => {
    configureCloudinary();
    return new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'portfolio/skills',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
            transformation: [{ width: 100, height: 100, crop: 'fill' }],
        },
    });
};

// Multer instances — created lazily on first use
let _uploadProjectImage = null;
let _uploadSkillIcon = null;

export const uploadProjectImage = {
    single: (field) => (req, res, next) => {
        if (!_uploadProjectImage) _uploadProjectImage = multer({ storage: getProjectStorage() });
        _uploadProjectImage.single(field)(req, res, next);
    },
};

export const uploadSkillIcon = {
    single: (field) => (req, res, next) => {
        if (!_uploadSkillIcon) _uploadSkillIcon = multer({ storage: getSkillStorage() });
        _uploadSkillIcon.single(field)(req, res, next);
    },
};

export { cloudinary };
