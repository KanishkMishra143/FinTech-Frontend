const { Client } = require('pg');

const client = new Client({
  user: 'postgres.bumuydwxxkjtzobhmxfh',
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  database: 'postgres',
  password: 'B2AdrhT6mCTp3k',
  port: 5432,
  // For Supabase, accept self-signed certificates
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => {
    console.error('Connection error:', err);
    if (err.code) console.error('Error code:', err.code);
    if (err.message) console.error('Error message:', err.message);
    if (err.stack) console.error('Error stack:', err.stack);
    if (err instanceof AggregateError) {
      for (const e of err.errors) {
        console.error('AggregateError sub-error:', e);
      }
    }
  });

// Handle unexpected client errors gracefully
client.on('error', (err) => {
  console.error('Unexpected client error:', err);
});

module.exports = client;