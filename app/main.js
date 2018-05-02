$( document ).ready(function() {

  const page = [
    {
      id: 'nav',
      module: require('./components/front-grid/script.js')
    }
  ]

  page.forEach( e => {

    const eExists = $(e.id).length

    eExists && e.module.init()

  })


})
