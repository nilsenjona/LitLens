import dotenv from 'dotenv';
dotenv.config({ override: true });

import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes';
import listsRoutes from './routes/listsRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/litlens';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', listsRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
