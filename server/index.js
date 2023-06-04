require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios');


const app = express();
app.use(express.json())
app.use(cors());

app.post('/getWeather', async (req, res) => {
    const { cities } = req.body;
    console.log(cities)

    try {
        let weather = {};
        const result = await Promise.all(cities.map(async cityName => {
            const res = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${cityName}`)
            console.log(res)
            console.log(res.data.current.temperature)
            weather[cityName] = res.data.current.temperature
            return { cityName: res.data.current.temperature }
        }))

        console.log(result)
        console.log("result", weather)
            // (async () => {

            //     let weather = {};
            //     for (let i = 0; i < cities.lenght; i++) {
            //         console.log(i)
            //         weather[cities[i]] = result[i]
            //     }
            //     console.log(weather)
            //     return res.json(weather)
            // })
            return res.json({
                status: true,
                weather 
            })
    } catch (err) {
        console.log("got errpr")
        console.log(err)
        return res.status(500).json({
            status: false,
            error: err
        })
    }
    return res.json({
        message: 'ok'
    })
})


const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`server is listening on ${PORT}`)
})