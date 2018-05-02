module.exports = {
  init: function(){
    this.showMenu()
  },

  showMenu: function(){
    console.log('holi');
    const buttonMenu = $('.open-menu')
    console.log(buttonMenu);

    buttonMenu.on('click', () => {
      const menu = $('.menu')

      menu.toggleClass('in')

    })



  }
}
