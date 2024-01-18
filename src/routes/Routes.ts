import express from 'express';
import libraryController from '../controllers/libraryController';
import playlistController from "../controllers/playlistController";
import streamUrlController from "../controllers/streamUrlController";
import musicController from "../controllers/musicController";

const router = express.Router();

// Définir les routes pour la bibliothèque
router.get('/library', libraryController.getLibrary);
router.get('/playlist/:playlistId', playlistController.getPlaylist);
router.get('/streamUrl/:id', streamUrlController.getStreamUrl);
router.get('/music/:musicId', musicController.getMusic);

export default router;
