module.exports = {
    script: 'dist/index.js', // Path to your compiled JavaScript file
    watch: true, // Auto-restart the app when files change (optional)
    ignore_watch: ['node_modules','logs'], // Ignore certain directories from auto-restart (optional)
    env: {
        NODE_ENV: 'production',
        PORT: 3000,
        CLOUDINARY_CLOUD : 'dfbyutwmz',
        CLOUDINARY_API_KEY : '616888345499255',
        CLOUDINARY_API_SECRET : 'n8GoExGOO1f4_Vp63f3KJoDC5CA',
    },
};