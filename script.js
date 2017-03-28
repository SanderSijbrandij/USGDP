document.addEventListener('DOMContentLoaded', () => {
  const dataFile = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  getData(dataFile)
    .catch((err) => { console.error('something went wrong') })
    .then((res) => {
      // call anything that requires the data here.
      // This is the point where it's fetched.
      console.log(res)
      createChart();
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
const createChart = () => {
  const padding = 100,
        w = 800,
        h = 400

  d3.select('body')
    .append('svg')
    .attr('id', 'chart')
    .attr('width', w)
    .attr('height', h)
}
