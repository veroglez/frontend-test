class FrontGrid {

  constructor(){
    this.citiesNotRepeated = []
    this.countriesNotRepeated = []
    this.data ={}
  }

  init(){
    this.map = require('../map/script.js')
    this.templates = require('../templates/script.js')
    this.templateGrid = require('./templates/grid.hbs')
    this.templateMenu = require('../menu/templates/countries.hbs')
    this.createSession()
    this.requestApi()
  }

  filterObject(element, key, value){
    return element.filter( e => {
      return e[`${key}`] == value ? e : false
    })
  }

  pushIntoArray(e, arr, key, arrNotRepeated){
    if(!arr.includes(e[`${key}`])){
      arr.push(e[`${key}`])
      arrNotRepeated != undefined && arrNotRepeated.push(e)
    }
  }

  createUrlImage(e){
    const hashcode = e.picture_hashcode
    const imgSize = [130, 180]

    if(hashcode!=null){
      const chars01 = hashcode.slice(0, 2)
      const chars12 = hashcode.slice(2, 4)
      e.image = `https://imgs-akamai.mnstatic.com/${chars01}/${chars12}/${hashcode}.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C${imgSize[0]}%3A${imgSize[1]}&crop=${imgSize[0]}%3A${imgSize[1]}%3B*%2C*`
    }
  }

  filterCitiesByCountry(e){
    const country = $(e.currentTarget).find('p').text()
    const dataByCountries = this.filterObject(this.citiesNotRepeated, 'country_name', country)

    this.templates.emptyAndAddNewTemplate( $('section'), this.templateGrid, dataByCountries)

    $('.menu').toggleClass('in')
    $('.item').on('click', (e) => { this.openMapForCity(e) })
  }

  openMapForCity(e){
    const city = $(e.currentTarget).find('.title').text()
    const dataByCities = this.filterObject(this.data, 'city_name', city)

    this.map.init(dataByCities)
  }

  requestApi(){
    $.ajax({
      method: 'GET',
      url: 'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json',
    }).then(res => {
      const countries = []
      const cities = []
      this.data = JSON.parse(res)

      this.data.forEach( e => {
        this.pushIntoArray(e, countries, 'country_name', this.countriesNotRepeated)
        this.pushIntoArray(e, cities, 'city_name', this.citiesNotRepeated)
        this.createUrlImage(e)
      })

      $('section').append(this.templateGrid({data:this.citiesNotRepeated}))
      $('header nav').append(this.templateMenu({data:this.countriesNotRepeated}))

      $('.menu li').on('click', (e) => { this.filterCitiesByCountry(e) })
      $('.item').on('click', (e) => { this.openMapForCity(e) })

    })
  }

  createSession(){
    const timeMin = 5
    const sessionExists = localStorage.getItem('stationsId') != null
    const sessionHasExpired = new Date().getTime() >= localStorage.getItem('timestamp')

    if(sessionExists){
      if(sessionHasExpired)
        localStorage.removeItem('stationsId')
      else
        return false
    }
    localStorage.setItem('timestamp', new Date().getTime() + timeMin*60*1000)
  }

}

module.exports = FrontGrid
