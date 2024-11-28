import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = "8080";

app.listen(PORT, () => console.log(
  `Server running on port ${PORT}`
));