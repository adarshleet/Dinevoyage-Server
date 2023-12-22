module.exports = {
    script: 'dist/index.js', // Path to your compiled JavaScript file
    watch: true, // Auto-restart the app when files change (optional)
    ignore_watch: ['node_modules', 'logs'], // Ignore certain directories from auto-restart (optional)
    env: {
        // ACC_SID : 'AC8d4bf4bf01f1bca9eddbe2dbd66abc7a',
        // AUTH_TOKEN : 'cc3f234f256fa5ef0b31f9a7b875178b',
        // SERVICE_SID : 'VA0368af8cae07819ac37e7e6fc5f82cd9',
        NODE_ENV: 'production',
        PORT: 3000,
        MONGO_URI : "mongodb+srv://adarshravi:adarsh98475@dinevoyage.s4rqywm.mongodb.net/DineVoyage?retryWrites=true&w=majority",
        CORS_URL : 'http://localhost:5000'
    },
};