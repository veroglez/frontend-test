module.exports = {

  init: function(){
    this.openCloseMenu()
  },

  openCloseMenu: function(){
    $('.open-menu').on('click', () => {
      $('.menu').toggleClass('in')
    })
  }
}
