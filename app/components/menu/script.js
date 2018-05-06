class Menu {

  constructor(){
    this.iconOpen = $('.open-menu')
  }

  init(){
    this.openCloseMenu()
  }

  openCloseMenu(){
    this.iconOpen.on('click', () => {
      $('.menu').toggleClass('in')
    })
  }
}

module.exports = Menu
