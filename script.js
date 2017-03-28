document.addEventListener('DOMContentLoaded', () => {
  const dataFile = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  getData(dataFile)
    .catch((err) => { console.error('something went wrong') })
    .then((res) => {
      console.log(res)

      // set sizes
      const w = 800, h = 400, p = 2

      // Create the Chart
      createChart(w, h)

      // get min values
      // get max values
      // set scale & domain
      // Add x Axis
      // add y Axis

      // Add bars
      createBars(res.data, w, h, p)

    })
})

// Create a Promise so we can have a bit of error handling
// this fetches the data from the url passed to it.
const getData = (url) => {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest()
    req.open("GET", url, true)
    req.send()
    req.onload = () => {
      if (req.status == 200) { resolve(JSON.parse(req.responseText)) }
      else { reject(req.statusText) }
    }
  })
}

// create the SVG
const createChart = (w, h) => {
  d3.select('body')
    .append('svg')
    .attr('id', 'chart')
    .attr('width', w)
    .attr('height', h)
}

// Add the bars
// TODO: Actually use the data
const createBars = (data, width, height, padding) => {
  d3.select('#chart')
    .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', 15)
      .attr('height', 300)
      .attr('x', (d, i) => padding + (i * (15 + padding)))
      .attr('y', height-300)
}
