const axios = require("axios");
const { json } =  require("express");

exports.summoner = async(req, res) => {
    const { summonerName } = req.params

    const summonerIdResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, 
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    const { id, profileIconId, summonerLevel} = summonerIdResponse.data

    return res.json({
        id,
        summonerName,
        summonerLevel,
        profileIconId
})}

exports.summonerChampionMastery = async(req, res) => {
    const { summonerName } = req.params

    const summonerIdResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, 
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    const { id } = summonerIdResponse.data

    const championMastery = await axios.get(`${process.env.LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    const data = championMastery.data

    return res.send(data)
}

exports.summonerRank = async(req, res) => {
    const { rankedName } = req.params
    const { summonerName } = req.params
    
    const summonerIdResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, 
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    // Summoner data
    const { id, profileIconId, summonerLevel} = summonerIdResponse.data

    const responseRanked = await axios.get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`,
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}})
    .then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    if (rankedName === "solo") {
        try{
            // Ranked data
            const { tier, rank, wins, losses, queueType } = responseRanked.data[0]
        
            // Complete card Ranked
            return res.json({
                summonerName,
                summonerLevel,
                tier,
                rank,
                wins,
                losses,
                queueType,
                iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
                winRate: ((wins / (wins + losses)) * 100).toFixed(1)
            })
        } catch(e) {
            res.json('Data not found.')
        }
    }

    if (rankedName === "flex") {
        try {
            // Ranked data
            const { tier, rank, wins, losses, queueType } = responseRanked.data[1]
        
            // Complete card Ranked
            return res.json({
                summonerName,
                summonerLevel,
                tier,
                rank,
                wins,
                losses,
                queueType,
                iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
                winRate: ((wins / (wins + losses)) * 100).toFixed(1)
            })
        } catch(e) {
            res.json('Data not found.')
        }
    }
}

exports.summonerSpectator = async(req, res) => {
    const { summonerName } = req.params

    const summonerIdResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, 
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    const {id} = summonerIdResponse.data

    const championMastery = await axios.get(`${process.env.LOL_URL}/lol/spectator/v4/active-games/by-summoner/${id}`,
    {headers: { 'X-Riot-Token': process.env.LOL_KEY}}
    ).then((resposta) => {
        return resposta
    }).catch((e) => {
        res.send(res.json(e.response.data.status))
    })

    const data = championMastery.data
    return res.send(data)
}