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

      data.forEach( e=>{
        const hashcode = e.picture_hashcode

        if(hashcode!=null){
          const chars01 = hashcode.slice(0, 2)
          const chars12 = hashcode.slice(2, 4)
          e.image = `https://imgs-akamai.mnstatic.com/${chars01}/${chars12}/${hashcode}.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C90%3A183&crop=90%3A183%3B*%2C*`
        }
      })

      var template = require('./template.hbs')
      const grid = $('section')
      grid.append(template({data:data}))
    })
  }
}
