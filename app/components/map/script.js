const loadGoogleMapsApi = require('load-google-maps-api')
const Templates = require('../templates/script.js')
const env = require('../../env.js')

class Maps{

  constructor(){
    this.apiKey = env.apiKey
    this.stationsChecked = []
    this.templateMap = require('./template.hbs')
    this.templateMenu = require('../menu/templates/stations.hbs')
    this.templates = new Templates()
  }

  init(data){
    this.data = data

    this.templates.emptyAndAddNewTemplate($('section'), this.templateMap)
    this.templates.emptyAndAddNewTemplate($('.menu'), this.templateMenu, data)

    $('.stations li').on('click', e => this.storeDataToLocalStorage(e))

    loadGoogleMapsApi({key: this.apiKey})
      .then( googleMaps => {
        this.map = this.createGoogleMap(googleMaps, data)
        this.drawMarkersMap(data, this.map)
      })
      .catch( err => console.error(err))
  }

  createGoogleMap(googleMaps, data){
    return new googleMaps.Map(document.getElementById('map'), {
      center: {lat: Number(data[0].latitude), lng: Number(data[0].longitude)},
      zoom: 12,
      disableDefaultUI: true
    })
  }

  drawMarkersMap(data, map){
    const stationList = $('.menu li')
    let stationsStored = JSON.parse(localStorage.getItem('stationsId'))

    stationList.each( (i, e) => {
      let stationId = $(e).attr('data-id')
      stationsStored && stationsStored.includes(stationId) ? $(e).addClass('checked') : false
    })

    for (let e in data){
      let markerColor = stationsStored && stationsStored.includes(data[e].id) ? '#d55b4e' : '#fff'

      new google.maps.Marker({
        position: {lat: Number(data[e].latitude), lng: Number(data[e].longitude)},
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8.5,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeWeight: 1
        },
      })
    }
  }

  storeDataToLocalStorage(e){
    const item = $(e.currentTarget)
    const stationId = item.attr('data-id')
    let stationsStored = JSON.parse(localStorage.getItem('stationsId'))

    item.toggleClass('checked')

    if( stationsStored == null )
      stationsStored = []

    const stationIdExists = stationsStored.includes(stationId)
    if(!stationIdExists){
      stationsStored.push(stationId)

    }else{
      stationsStored = stationsStored.filter(e => e != stationId)
    }

    localStorage.setItem('stationsId', JSON.stringify(stationsStored))

    this.drawMarkersMap(this.data, this.map)
  }

}

module.exports = Maps
