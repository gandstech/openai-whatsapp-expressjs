import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import facebookWebhook from './controller/index';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json())

app.use('/node-express', facebookWebhook);

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})