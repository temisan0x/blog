import { v2 as cloudinary } from 'cloudinary';

// Your Cloudinary configuration
cloudinary.config({
    cloud_name: 'next_cloudinary_app',
    api_key: 'pO4AHuio1ta6iqvght8o32dT9Fk',
    api_secret: '465644685598584',
});

export default cloudinary;
