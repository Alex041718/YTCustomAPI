import express  from 'express';

import cors from 'cors';

const app = express();

import libraryRoutes from './routes/Routes';

app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Définition des routes

app.use('/api', libraryRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});