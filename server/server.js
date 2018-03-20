//MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const trails = require('./routes/trails');
const { timedCalls } = require('./utilities/helper');
const { updateWeatherStations } = require('./utilities/updateWeatherStations');
const { getRainData } = require ('./utilities/rainData.js')
const Trail = require('./db/models/Trails');
const fakeData = require('./utilities/fakeData')
const { getTrailHeads } = require('./utilities/helper')

//CONSTANTS
const PORT = process.env.PORT  || 3000;

//APPLICATIONS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use('/trails', trails);
app.use(express.static('pubic'));
app.use(express.static('public'));

let resultObj = {
  length: '',
  elev: '',
  weatherConditions: null
}

app.get('/api/hikeNow/fake', (req, res) =>{
  return res.json(fakeData)
})

app.get('/api/hikeNow/trail/:name', (req, res) => {
  let name = req.params.name
  return new Trail()
  .where({trailname:name})
})

app.get('/api/hikeNow/', (req,res) => {
  return new Trail()
  .fetchAll()
  .then(allTrails => {
    allTrails = allTrails.toJSON()
    return allTrails
  }).then(connectData => {
    connectData.map(element => {
      if(global.hikeNow.weather[element.weather]){
        console.log('FUCKFJK')
       resultObj[element.trailname] = {
         length: element.length_m,
         elev: element.elev_range,
         weatherConditions: global.hikeNow.weather[element.weather]
       }
      }
    }) 
  }).then(result =>{
    return res.json(resultObj)
  })
})

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON ${PORT}`);
  getTrailHeads();
  //timedCalls(); 
  // updateWeatherStations();
  // getRainData();
});