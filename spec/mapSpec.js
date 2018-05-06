describe("Maps", () => {
  const Maps = require('../app/components/map/script')
  let maps

  beforeEach( () => {
    maps = new Maps()
    arr = ['Atocha','Chamartin']
  })

  it("should return an empty array if the parameter is null", () => {
    const element = null
    expect(maps.setDataFromLocalStorage(element)).toEqual([])
  })

  it("should push an element into array", () => {
    maps.addStationToStorage(arr, 'Metro')
    expect(arr).toEqual(['Atocha', 'Chamartin', 'Metro'])
  })

  it("should delete an element if already exists", () => {
    expect(maps.deleteStationToStorage(arr, 'Chamartin')).toEqual(['Atocha'])
  })

})
