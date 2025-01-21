const { createClient } = require('redis');
require('dotenv').config({ path: '../.env' });

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

client.connect()
    .then(() => {
        console.log('Connected to Redis!');
        
        checkKeys();
    })
    .catch((err) => {
        console.error('Error connecting to Redis:', err);
    });

async function checkKeys() {
    try {
        const keys = await client.keys('*');
        console.log('All Redis keys:', keys);
    } catch (err) {
        console.error('Error fetching keys:', err);
    }
}

process.on('SIGINT', async () => {
    console.log('Shutting down application, clearing Redis cache...');

    try {
        await client.flushAll();
        console.log('Redis cache cleared.');

        if (client.isOpen) {
            await client.quit();
            console.log('Redis client disconnected.');
        }
    } catch (err) {
        console.error('Error clearing Redis cache:', err);
    }

    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, clearing Redis cache...');

    try {
        await client.flushAll();
        console.log('Redis cache cleared.');
        
        if (client.isOpen) {
            await client.quit();
        }
    } catch (err) {
        console.error('Error clearing Redis cache:', err);
    }

    process.exit(0);
});

module.exports = client;
