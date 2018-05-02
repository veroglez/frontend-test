module.exports = {
  
  init: function(){
    this.showMenu()
  },

  showMenu: function(){
    $('.open-menu').on('click', () => {
      $('.menu').toggleClass('in')
    })
  }
}
