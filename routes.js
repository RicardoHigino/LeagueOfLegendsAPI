const express = require('express');
const route = express.Router();
const lolController = require('./src/controllers/lolController')

// Summoner
route.get('/summoner/:summonerName', lolController.summoner)
// Champion-Mastery
route.get('/summoner/champion-mastery/:summonerID', lolController.summonerChampionMastery)
// Summoner Ranked
route.get('/summoner/ranked/:rankedName/:summonerName', lolController.summonerRank)
// Summoner Spectator
route.get('/summoner/spectator/:summonerName', lolController.summonerSpectator)

module.exports = route;