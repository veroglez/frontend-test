module.exports = {
  countries: [],
  cities: [],
  citiesNotRepeated: [],
  data:{},
  templateGrid: require('./templates/grid.hbs'),
  templateMenu: require('./templates/menu.hbs'),
  section: $('section'),
  navMenu: $('header nav'),
  map: require('../map/script.js'),

  init: function(){
    this.requestApi()
  },

  filterCitiesByCountry: function(e){
    const country = $(e.target).text()

    const dataByCountries = this.citiesNotRepeated.filter( e => {
      return e.country_name == country ? e : false
    })

    this.section.empty()
    this.section.append(this.templateGrid({data:dataByCountries}))

    $('.menu').toggleClass('in')


    this.items = $('.item')
    this.items.on('click', (e) => {
      const item = $(e.currentTarget)
      const city = item.find('.title').text()

      const dataByCities = this.data.filter( e => {
        return e.city_name == city ? e : false
      })
      this.map.init(dataByCities)
    })
  },

  filterCity: function(city,obj) {
    return obj.city_name == city ? true : false
  },

  requestApi: function(){
    $.ajax({
      method: 'GET',
      url: 'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json',
    }).then(res => {
      this.data = JSON.parse(res)

      this.data.forEach( e => {
        const hashcode = e.picture_hashcode

        if(!this.countries.includes(e.country_name))
          this.countries.push(e.country_name)

        if(!this.cities.includes(e.city_name)){
          this.cities.push(e.city_name)
          this.citiesNotRepeated.push(e)
        }

        if(hashcode!=null){
          const chars01 = hashcode.slice(0, 2)
          const chars12 = hashcode.slice(2, 4)
          e.image = `https://imgs-akamai.mnstatic.com/${chars01}/${chars12}/${hashcode}.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C120%3A183&crop=120%3A183%3B*%2C*`
        }
      })

      this.section.append(this.templateGrid({data:this.citiesNotRepeated}))
      this.navMenu.append(this.templateMenu({countries:this.countries}))

      $('.menu li').on('click', (e) => { this.filterCitiesByCountry(e) })

    })
  }
}
