import app from './app';
import { config } from 'dotenv';
import connectDB from './config/db';

config();
connectDB()
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
