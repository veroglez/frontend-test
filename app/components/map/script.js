const loadGoogleMapsApi = require('load-google-maps-api')
const env = require('../../env.js')

module.exports = {
  apiKey: env.apiKey,
  section: $('section'),
  templateMap: require('./template.hbs'),

  init: function(data){
    this.section.empty()
    this.section.append(this.templateMap())


    loadGoogleMapsApi({key: this.apiKey}).then(function (googleMaps) {
      const map = new googleMaps.Map(document.getElementById('map'), {
        center: {lat: Number(data[0].latitude), lng: Number(data[0].longitude)},
        zoom: 12
      })

      for (var e in data) {
        new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeWeight: 20,
          map: map,
          center: {lat: Number(data[e].latitude), lng: Number(data[e].longitude)},
          radius: 2
        })
      }

    }).catch(function (error) {
      console.error(error)
    })

  }
}
