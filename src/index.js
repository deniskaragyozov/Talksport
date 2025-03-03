import express from 'express';

const app = express();

app.use(express.static('src/public'));
app.get('/', (req, res) => {
    res.send('Express setup');
});

app.listen(3030, () => console.log('Server is listening on http://localhost:3030...'));