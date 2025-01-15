const express = require('express');
const app = express();
const PORT = 8080;

app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});