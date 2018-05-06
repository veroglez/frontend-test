class Menu {

  constructor(){
    this.iconOpen = $('.open-menu')
  }

  init(){
    this.iconOpen.on('click', () => { this.openCloseMenu() })
  }

  openCloseMenu(){
    $('.menu').toggleClass('in')
  }
}

module.exports = Menu
