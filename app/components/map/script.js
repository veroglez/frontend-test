const $ = require("jquery")
const loadGoogleMapsApi = require('load-google-maps-api')
const Templates = require('../templates/script.js')
const env = require('../../env.js')

class Maps{

  constructor(){
    this.apiKey = env.apiKey
    this.stationsChecked = []
  }

  init(data){
    this.data = data
    this.templates = new Templates()
    this.templates.emptyAndAddNewTemplate($('section'), this.templates.map)
    this.templates.emptyAndAddNewTemplate($('.menu'), this.templates.stationsMenu, this.data)
    this.loadGoogleMaps()

    $('.stations li').on('click', e => this.storeDataToLocalStorage(e))
  }

  loadGoogleMaps(){
    loadGoogleMapsApi({key: this.apiKey})
      .then( googleMaps => {
        this.map = this.createGoogleMap(googleMaps, this.data)
        this.drawMarkersMap(this.data, this.map)
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
          strokeWeight: 0.1
        },
      })
    }
  }

  storeDataToLocalStorage(e){
    const item = $(e.currentTarget)
    const stationId = item.attr('data-id')
    let stationsStored = JSON.parse(localStorage.getItem('stationsId'))

    stationsStored = this.setDataFromLocalStorage(stationsStored)

    const stationIdExists = stationsStored.includes(stationId)
    if(!stationIdExists)
      this.addStationToStorage(stationsStored, stationId)
    else
      stationsStored = this.deleteStationToStorage(stationsStored, stationId)

    item.toggleClass('checked')
    localStorage.setItem('stationsId', JSON.stringify(stationsStored))
    this.drawMarkersMap(this.data, this.map)
  }

  setDataFromLocalStorage(element){
    return (element == null) ? [] : element
  }

  addStationToStorage(station, stationId){
    station.push(stationId)
  }

  deleteStationToStorage(station, stationId){
    return station.filter(e => e != stationId)
  }

}

module.exports = Maps
