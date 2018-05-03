const loadGoogleMapsApi = require('load-google-maps-api')
const env = require('../../env.js')

module.exports = {
  apiKey: env.apiKey,
  section: $('section'),
  templateMap: require('./template.hbs'),
  templateMenu: require('../menu/templates/stations.hbs'),

  init: function(data){
    this.menu = $('.menu')

    this.section.empty()
    this.section.append(this.templateMap())
    this.menu.empty()
    this.menu.append(this.templateMenu({stations:data}))


    loadGoogleMapsApi({key: this.apiKey}).then(function (googleMaps) {
      const map = new googleMaps.Map(document.getElementById('map'), {
        center: {lat: Number(data[0].latitude), lng: Number(data[0].longitude)},
        zoom: 12
      })

      for (var e in data) {
        new google.maps.Marker({
            position: {lat: Number(data[e].latitude), lng: Number(data[e].longitude)},
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: "#F00",
                fillOpacity: 0.4,
                strokeWeight: 0.4
            },
        });
      }

    }).catch(function (error) {
      console.error(error)
    })

  }
}
