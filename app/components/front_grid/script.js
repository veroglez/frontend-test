module.exports = {
  countries: [],
  cities: [],
  citiesNotRepeated: [],
  data:{},
  section: $('section'),
  navMenu: $('header nav'),
  map: require('../map/script.js'),
  templates: require('../templates/script.js'),
  templateGrid: require('./templates/grid.hbs'),
  templateMenu: require('../menu/templates/countries.hbs'),

  init: function(){
    this.requestApi()
  },

  filterObject: function(element, key, value){
    return element.filter( e => {
      return e[`${key}`] == value ? e : false
    })
  },

  pushIntoArray: function(e, arr, key, arrNotRepeated){
    !arr.includes(e[`${key}`]) && arr.push(e[`${key}`])
    arrNotRepeated && arrNotRepeated.push(e)
  },

  createUrlImage: function(e){
    const hashcode = e.picture_hashcode

    if(hashcode!=null){
      const chars01 = hashcode.slice(0, 2)
      const chars12 = hashcode.slice(2, 4)
      e.image = `https://imgs-akamai.mnstatic.com/${chars01}/${chars12}/${hashcode}.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C120%3A183&crop=120%3A183%3B*%2C*`
    }
  },

  filterCitiesByCountry: function(e){
    const country = $(e.target).text()
    const dataByCountries = this.filterObject(this.citiesNotRepeated, 'country_name', country)

    this.templates.emptyAndAddNewTemplate(this.section, this.templateGrid, dataByCountries)

    $('.menu').toggleClass('in')

    this.items = $('.item')
    this.items.on('click', (e) => {
      const city = $(e.currentTarget).find('.title').text()
      const dataByCities = this.filterObject(this.data, 'city_name', city)

      this.map.init(dataByCities)
    })
  },

  requestApi: function(){
    $.ajax({
      method: 'GET',
      url: 'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json',
    }).then(res => {
      this.data = JSON.parse(res)

      this.data.forEach( e => {
        this.pushIntoArray(e, this.countries, 'country_name')
        this.pushIntoArray(e, this.cities, 'city_name', this.citiesNotRepeated)
        this.createUrlImage(e)
      })

      this.section.append(this.templateGrid({data:this.citiesNotRepeated}))
      this.navMenu.append(this.templateMenu({countries:this.countries}))

      $('.menu li').on('click', (e) => { this.filterCitiesByCountry(e) })

    })
  }
}
