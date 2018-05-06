class Templates {

  constructor(){
    this.grid = require('../front_grid/templates/grid.hbs')
    this.countriesMenu = require('../menu/templates/countries.hbs')
    this.stationsMenu = require('../menu/templates/stations.hbs')
    this.map = require('../map/templates/template.hbs')
  }

  emptyAndAddNewTemplate(element, template, data){
    element.empty()
    element.append(template({data:data}))
  }

  addTemplate(element, template, data){
    element.append(template({data:data}))
  }

}

module.exports = Templates
