import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import projectRoutes from '../routes/projectRoutes';
import taskRoutes from '../routes/taskRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(projectRoutes);
app.use(taskRoutes);

const uri = process.env.URI;
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})