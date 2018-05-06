describe("FrontGrid", () => {
  const FrontGrid = require('../app/components/front_grid/script')
  let element

  beforeEach( () => {
    frontGrid = new FrontGrid()
    element = [
      {city_name: 'Madrid', country_name: 'Spain'},
      {city_name: 'Bagan', country_name: 'Myanmar'}
    ]
    })


  it("should filter an object according to a value of key", () => {
    const result = [{city_name: 'Madrid', country_name: 'Spain'}]
    expect(frontGrid.filterObject(element, 'country_name', 'Spain')).toEqual(result)
  })

  it("should push into array elements of and object not repeated", () => {
    const element = {city_name: 'Madrid', country_name: 'Spain'}
    const countries = ['Italy']
    const countriesNotRepeated = [{city_name: 'Rome', country_name: 'Italy'}]

    frontGrid.pushIntoArray(element, countries, 'country_name', countriesNotRepeated)

    expect(countriesNotRepeated).toEqual([{city_name: 'Rome', country_name: 'Italy'}, {city_name: 'Madrid', country_name: 'Spain'}])
    expect(countries).toEqual( ['Italy','Spain'])
  })

  it("should create an url from a hascode to obtain an image with certain size", () => {
    const element = {picture_hashcode: '161562'}
    const result = {
      picture_hashcode: '161562',
      image: `https://imgs-akamai.mnstatic.com/16/15/161562.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C130%3A180&crop=130%3A180%3B*%2C*`
    }

    frontGrid.createUrlImage(element)
    expect(element).toEqual(result)
  })


})
