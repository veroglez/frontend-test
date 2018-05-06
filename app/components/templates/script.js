class Templates {
  
  emptyAndAddNewTemplate(element, template, data){
    element.empty()
    element.append(template({data:data}))
  }

}

module.exports = Templates
