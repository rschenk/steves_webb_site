// Get a reference to the <canvas> tag
let canvas = document.getElementById('my-canvas')

// url to the SVG in question
let url = './orbit.svg'

// will hold a reference to the SVG once imported into paper.js
// we don't actually use this ever, but...
let importedSVG

// A named path inside the SVG file, that we want to follow
let orbitPath

// A little red dot representing the position of the Webb spacecraft
let webbDot

// How far along the path the Webb has travelled
let percentTravelled = 0.0 // from 0.0 (beginning) to 1.0 (end) of curve

// Paperjs does this weird thing where it pollutes the global namespace with 
// a variable called `paper`. This comes from including the paperjs library,
// which has to be loaded before this script.
paper.setup(canvas)

// Load SVG from url
paper.project.importSVG(url, function(item) {
  importedSVG = item
  
  // Center the SVG
  importedSVG.position = [
    importedSVG.bounds.width/2, 
    importedSVG.bounds.height/2
  ]
  
  // Dig through the SVG to find the path that I named 'orbitPath'. 
  // See `orbit.svg` for that.
  orbitPath = importedSVG.children['orbitPath']
  
  // Initialize webbDot to be a circle centered on orbitPath at percentTravelled
  let curveOffset = orbitPath.length * percentTravelled
  let coordinates = orbitPath.getPointAt(curveOffset)
  webbDot = new paper.Path.Circle({
    center: coordinates,
    radius: 3,
    fillColor: '#f00',
    strokeColor: null
  })
})

// Animate!!!
paper.view.onFrame = function(event) {
  if (!webbDot) { return }
  
  let step = 0.001
  percentTravelled += step
  
  if (percentTravelled > 1.0) {
    percentTravelled = 0
  }
  
  let curveOffset = orbitPath.length * percentTravelled
  let coordinates = orbitPath.getPointAt(curveOffset)

  webbDot.position = coordinates
}
