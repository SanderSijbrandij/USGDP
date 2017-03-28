document.addEventListener('DOMContentLoaded', () => {
  const dataFile = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  getData(dataFile)
    .catch((err) => { console.error('something went wrong') })
    .then((res) => {
      // necessary data
      const datapoints = res.data.length
      const minGDPValue = d3.min(res.data, d => d[1])
      const maxGDPValue = d3.max(res.data, d => d[1])
      const minDateValue = d3.min(res.data, d => d[0])
      const maxDateValue = d3.max(res.data, d => d[0])
      const minDateYear = minDateValue.split('').slice(0,4).join('')
      const maxDateYear = maxDateValue.split('').slice(0,4).join('')

      // set sizes
      const p = 40
      const h = 600
      const w = 3*datapoints + 2*p
      const sizes = { w, h, p }

      // set scale & domain
      const scaleY = d3.scaleLinear().domain([minGDPValue, maxGDPValue]).range([h-p, 0])
      const scaleX = d3.scaleLinear().domain([minDateYear, maxDateYear]).range([0, w-2*p])

      // Create the Chart
      createChart(w, h)
      createYAxis(scaleY, sizes)
      createXAxis(scaleX, sizes)
      createBars(res.data, scaleY, sizes)
    })
})

// Fetch the data we need
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

// create the Chart
const createChart = (w, h) => {
  d3.select('body')
    .append('svg')
    .attr('id', 'chart')
    .attr('width', w)
    .attr('height', h)
}

// Create the Y axis
const createYAxis = (scaleY, sizes) => {
  const { w, h, p } = sizes
  const yAxis = d3.axisLeft(scaleY)

  d3.select('#chart')
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${1.5 * p}, ${p/2})`)
    .call(yAxis)
}

// create the X axis
const createXAxis = (scaleX, sizes) => {
  const { w, h, p } = sizes
  const xAxis = d3.axisBottom(scaleX)

  d3.select('#chart')
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(${1.5 * p}, ${h - (p/2)})`)
    .call(xAxis)
}

// Add the bars
const createBars = (data, scaleY, sizes) => {
  const { h, p } = sizes
  d3.select('#chart')
    .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', 2)
      .attr('height', (d) => h - p - scaleY(d[1]))
      .attr('x', (d, i) => (1.5 * p) + (i * 3))
      .attr('y', (d) => scaleY(d[1]) + (p/2))
}
