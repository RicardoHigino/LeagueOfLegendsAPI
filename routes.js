const express = require('express');
const route = express.Router();
const lolController = require('./src/controllers/lolController')

route.get('/summoner/:summonerName', lolController.summoner)
route.get('/summoner/champion-mastery/:summonerID', lolController.summonerChampionMastery)
route.get('/summoner/ranked/:rankedName/:summonerName', lolController.summonerRank)
route.get('/summoner/spectator/:summonerName', lolController.summonerSpectator)

module.exports = route;