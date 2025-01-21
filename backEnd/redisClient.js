// const { createClient } = require('redis');
// require('dotenv').config({path:`../.env`});

// const client = createClient({
//     url: process.env.REDIS_URL
// });

// client.on('error', err => {
//     console.error('Redis Client Error', err);
// });

// client.connect()
//     .then(() => {
//         console.log('Connected to Redis!');
//         checkKeys();
//     })
//     .catch(err => {
//         console.error('Error connecting to Redis:', err);
//     });

//     // const keys = client.keys('*'); // Get all keys
//     // console.log(keys);

//     async function checkKeys() {
//         try {
//             const keys = await client.keys('*'); // Get all keys asynchronously
//             console.log('All Redis keys:', keys);
//         } catch (err) {
//             console.error('Error fetching keys:', err);
//         }
//     }
    
// module.exports = client;
// const { createClient } = require('redis');
// require('dotenv').config({ path: '../.env' });

// const client = createClient({
//     url: process.env.REDIS_URL
// });

// client.on('error', (err) => {
//     console.error('Redis Client Error', err);
// });

// // Connect to Redis
// client.connect()
//     .then(() => {
//         console.log('Connected to Redis!');
        
//         // Fetch and log keys as an example
//         checkKeys();
//     })
//     .catch((err) => {
//         console.error('Error connecting to Redis:', err);
//     });

// // Function to check and log keys
// async function checkKeys() {
//     try {
//         const keys = await client.keys('*'); // Get all keys asynchronously
//         console.log('All Redis keys:', keys);
//     } catch (err) {
//         console.error('Error fetching keys:', err);
//     }
// }

// // Clear Redis cache when the application shuts down
// process.on('SIGINT', async () => {
//     console.log('Shutting down application, clearing Redis cache...');

//     try {
//         // Use flushall to clear all keys in the Redis database
//         await client.flushAll();  // This will delete all keys from all Redis databases
//         console.log('Redis cache cleared.');

//         // Gracefully disconnect Redis
//         await client.quit();
//         console.log('Redis client disconnected.');
//     } catch (err) {
//         console.error('Error clearing Redis cache:', err);
//     }

//     // Exit the process
//     process.exit(0);  // Exit the application successfully
// });

// // Alternatively, you can also use SIGTERM if it's more appropriate
// process.on('SIGTERM', async () => {
//     console.log('Received SIGTERM, clearing Redis cache...');

//     try {
//         await client.flushAll();  // Clear all keys
//         console.log('Redis cache cleared.');
//         await client.quit();  // Disconnect from Redis
//     } catch (err) {
//         console.error('Error clearing Redis cache:', err);
//     }

//     process.exit(0);  // Exit the application
// });

// module.exports = client;
const { createClient } = require('redis');
require('dotenv').config({ path: '../.env' });

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

// Connect to Redis
client.connect()
    .then(() => {
        console.log('Connected to Redis!');
        
        // Fetch and log keys as an example
        checkKeys();
    })
    .catch((err) => {
        console.error('Error connecting to Redis:', err);
    });

// Function to check and log keys
async function checkKeys() {
    try {
        const keys = await client.keys('*'); // Get all keys asynchronously
        console.log('All Redis keys:', keys);
    } catch (err) {
        console.error('Error fetching keys:', err);
    }
}

// Clear Redis cache when the application shuts down
process.on('SIGINT', async () => {
    console.log('Shutting down application, clearing Redis cache...');

    try {
        // Use flushall to clear all keys in the Redis database
        await client.flushAll();  // This will delete all keys from all Redis databases
        console.log('Redis cache cleared.');
        
        // Check if the client is still connected before calling quit
        if (client.isOpen) {
            await client.quit();  // Gracefully disconnect from Redis
            console.log('Redis client disconnected.');
        }
    } catch (err) {
        console.error('Error clearing Redis cache:', err);
    }

    // Exit the process
    process.exit(0);  // Exit the application successfully
});

// Alternatively, you can also use SIGTERM if it's more appropriate
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, clearing Redis cache...');

    try {
        await client.flushAll();  // Clear all keys
        console.log('Redis cache cleared.');
        
        if (client.isOpen) {
            await client.quit();  // Disconnect from Redis
        }
    } catch (err) {
        console.error('Error clearing Redis cache:', err);
    }

    process.exit(0);  // Exit the application
});

module.exports = client;
