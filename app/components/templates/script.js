class Templates {

  constructor(){
    this.templateGrid = require('../front_grid/templates/grid.hbs')
    this.templateMenu = require('../menu/templates/countries.hbs')
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
