module.exports = {

  emptyAndAddNewTemplate: function(element, template, data){
    element.empty()
    element.append(template({data:data}))
  }
  
}
