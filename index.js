const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

const apiKey = 'jtXVuk9oe1IVaPZZW1';
const apiSecret = 'mUH7zO960MhElLVnP3XB30qL7Rw0YubM34LH';

app.get('/getBalance', async (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const params = `api_key=${apiKey}&timestamp=${timestamp}`;
    const sign = crypto
        .createHmac('sha256', apiSecret)
        .update(params)
        .digest('hex');

    const url = `https://api.bybit.com/v2/private/wallet/balance?${params}&sign=${sign}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Unable to fetch balance' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
