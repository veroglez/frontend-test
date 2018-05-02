module.exports = {
  countries: [],
  data:{},
  templateGrid: require('./templates/grid.hbs'),
  templateMenu: require('./templates/menu.hbs'),
  section: $('section'),
  navMenu: $('header nav'),

  init: function(){
    this.requestApi()
  },

  filterCitiesByCountry: function(e){
    const city = $(e.target).text()

    const dataByCities = this.data.filter(filterCity)

    this.section.empty()
    this.section.append(this.templateGrid({data:dataByCities}))

    $('.menu').toggleClass('in')

    function filterCity(obj) {
      return obj.country_name == city ? true : false
    }
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

        if(hashcode!=null){
          const chars01 = hashcode.slice(0, 2)
          const chars12 = hashcode.slice(2, 4)
          e.image = `https://imgs-akamai.mnstatic.com/${chars01}/${chars12}/${hashcode}.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C120%3A183&crop=120%3A183%3B*%2C*`
        }
      })

      this.section.append(this.templateGrid({data:this.data}))
      this.navMenu.append(this.templateMenu({countries:this.countries}))

      $('.menu li').on('click', (e) => { this.filterCitiesByCountry(e) })
    })
  }
}
