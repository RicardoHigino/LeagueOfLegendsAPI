require("dotenv").config();
var axios = require("axios");
const express = require("express");
const { json } =  require("express");
const cors = require("cors")

const app = express()

app.use(cors())
app.use(json())

app.listen(3000, () => {
    console.log('SERVER ON')
})

app.get('/summoner/ranked/:summonerName', async(req, res) => {
    const { summonerName } = req.params
    
    const summonerIdResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, 
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    // Dados dos jogadores
    const { id, profileIconId, summonerLevel} = summonerIdResponse.data

    const responseRanked = await axios.get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/$${id}`,
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}})
    .then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    // Dados da Ranked
    const { tier, rank, wins, losses, queueType } = responseRanked.data[1]
    ? responseRanked.data[1] : responseRanked.data[0]

    // Dados completos
    return res.json({
        summonerLevel,
        tier,
        rank,
        wins,
        losses,
        queueType,
        iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
        winRate: ((wins / (wins + losses)) * 100).toFixed(1)
    })
}) 
