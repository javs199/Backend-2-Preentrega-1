import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT ?? 3000;

try {
  await connectDB();
} catch (err) {
  console.error('Error al conectar con MongoDB:', err.message);
  console.error('Asegúrate de que MongoDB está corriendo o que MONGO_URI en .env es correcta.');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
