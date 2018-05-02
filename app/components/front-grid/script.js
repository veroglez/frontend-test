module.exports = {
  init: function(){
    this.requestApi()
  },

  requestApi: function(){
    $.ajax({
      method: 'GET',
      url: 'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json',
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
    })
  }
}
