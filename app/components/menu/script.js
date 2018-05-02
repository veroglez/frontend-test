module.exports = {
  init: function(){
    this.showMenu()
  },

  showMenu: function(){
    const buttonMenu = $('.open-menu')

    buttonMenu.on('click', () => {
      const menu = $('.menu')
      menu.toggleClass('in')
    })
  }
}
