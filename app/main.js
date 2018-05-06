var FrontGrid = require('./components/front_grid/script.js')

$( document ).ready(function() {

  const frontGrid = new FrontGrid()
  const page = [
    {
      id: 'nav',
      class: frontGrid
    },
    {
      id: 'nav',
      class: require('./components/menu/script.js')
    }
  ]

  page.forEach( e => {
    const eExists = $(e.id).length
    eExists && e.class.init()
  })
})
