const $ = require("jquery")
const FrontGrid = require('./components/front_grid/script.js')
const Menu = require('./components/menu/script.js')

$( document ).ready(function() {

  const frontGrid = new FrontGrid()
  const menu = new Menu()

  const page = [
    {
      id: 'nav',
      class: frontGrid
    },
    {
      id: 'nav',
      class: menu
    }
  ]

  page.forEach( e => {
    const eExists = $(e.id).length
    eExists && e.class.init()
  })
})
