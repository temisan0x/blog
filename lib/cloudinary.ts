import { v2 as cloudinary } from 'cloudinary';

// Your Cloudinary configuration
cloudinary.config({
    cloud_name: 'next_cloudinary_app',
    api_key: '465644685598584',
    api_secret: 'pO4AHuio1ta6iqvght8o32dT9Fk',
});

export default cloudinary;
