const loadGoogleMapsApi = require('load-google-maps-api')
const env = require('../../env.js')

module.exports = {
  apiKey: env.apiKey,
  templateMap: require('./template.hbs'),
  templateMenu: require('../menu/templates/stations.hbs'),
  templates: require('../templates/script.js'),

  init: function(data){
    this.templates.emptyAndAddNewTemplate($('section'), this.templateMap)
    this.templates.emptyAndAddNewTemplate($('.menu'), this.templateMenu, data)

    loadGoogleMapsApi({key: this.apiKey})
      .then( googleMaps => {
        const map = this.createGoogleMap(googleMaps, data)

        for (var e in data)
          this.drawMarkersMap(data, e, map)

      })
      .catch( err => console.error(err))
  },

  createGoogleMap: function(googleMaps, data){
    return new googleMaps.Map(document.getElementById('map'), {
      center: {lat: Number(data[0].latitude), lng: Number(data[0].longitude)},
      zoom: 12
    })
  },

  drawMarkersMap: function(data, e, map){
    new google.maps.Marker({
      position: {lat: Number(data[e].latitude), lng: Number(data[e].longitude)},
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8.5,
        fillColor: "#F00",
        fillOpacity: 1,
        strokeWeight: 0
      },
    })
  }
}
