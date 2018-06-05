function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

this.calledOpen = false;
this.scaleX = getParameterByName('x') || 1 ;
this.scaleY = getParameterByName('y') || 1;
this.scaleZ = getParameterByName('z') || 1;


let scene = document.querySelector('a-scene');
let objectContainer = document.querySelector('#object-container');

// random num generator
function getRandomNumber(x, y) {
  return Math.floor(Math.random() * x + y);
}

let totalRingElements = 10;
// <a-portal-door
//   id='door'
//   url='videos/aframe-city-360.mp4'
//   position='0 0 4.25'
//   scale='2 2 1'
//   rotation='270 0 0'
//   open-on-scan
// >    </a-portal-door>

function generateAllElements() {

  for(let a = 0; a < totalRingElements; a++){

    // element params
    let totalCircleElements = getRandomNumber(10, 3);
    let elementScale = getRandomNumber(3, 1);
    let scaleDuration = getRandomNumber(3000, 1000);

    // path params
    let pathValOne = getRandomNumber(21, -10);
    let pathValTwo = getRandomNumber(11, -20);
    let pathDuration = getRandomNumber(6000, 5000);

    for (let i = 1; i <= totalCircleElements; i++) {

      let currentRotation = 360 / totalCircleElements * i;
      let rotateContainer = document.createElement('a-entity');
      rotateContainer.setAttribute('rotation', `0 0 ${currentRotation}`);

      // generate circle element and set params
      let circleElementContainer = document.createElement('a-entity');
      circleElementContainer.setAttribute('position', `0 1 0`);
      let circleElement = document.createElement('a-entity');
      circleElement.setAttribute('class', `circleElement`);
      circleElement.setAttribute('scale', `${elementScale} ${elementScale} ${elementScale}`);
      circleElement.setAttribute('material', `color:#${getRandomColor()}; metalness: 0; roughness: 0`);
      circleElement.setAttribute('geometry', `primitive: sphere; radius: 1.5`);
      circleElement.setAttribute('animation__yoyo', `property: scale; dir: alternate; dur: ${scaleDuration}; easing: easeInOutSine; loop: true; to: 0 0 0`);
      circleElementContainer.appendChild(circleElement);
      rotateContainer.appendChild(circleElementContainer);

      // generate path and apply it
      let track1 = document.createElement('a-curve');
      track1.setAttribute('class', `track${a}`);
      scene.append(track1);
      let point1 = document.createElement('a-curve-point');
      point1.setAttribute('position', '0 0 0');
      track1.append(point1);
      let point2 = document.createElement('a-curve-point');
      point2.setAttribute('position', `${pathValOne} ${pathValTwo} ${pathValOne}`);
      track1.append(point2);
      let point3 = document.createElement('a-curve-point');
      point3.setAttribute('position', `${pathValTwo} ${pathValOne} ${pathValTwo}`);
      track1.append(point3);
      let point4 = document.createElement('a-curve-point');
      point4.setAttribute('position', '0 0 0');
      track1.append(point4);
      circleElement.setAttribute(`alongpath`, `curve: .track${a}; dur: ${pathDuration}; loop: true`);

      // append element to main container
      console.log('REACHED', rotateContainer);
      objectContainer.appendChild(rotateContainer);

    }

  }

}

generateAllElements()

// get random hex color
function getRandomColor() {
  let letters = '0123456789abcdef';
  let randomColor = '';
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor;
}

AFRAME.registerComponent('open-on-scan', {
  init: function () {
    this.el.sceneEl.addEventListener(
      'markerOnScreen', function () {
        if (this.calledOpen) {
          return
        }
        var doorOpenAnim = document.createElement('a-animation');

        doorOpenAnim.setAttribute('id','doorOpenAnim');
        doorOpenAnim.setAttribute('attribute','scale');
        doorOpenAnim.setAttribute('begin','markerOnScreen');
        doorOpenAnim.setAttribute('fill','forwards');
        doorOpenAnim.setAttribute('easing','linear');
        doorOpenAnim.setAttribute('repeat','0');
        doorOpenAnim.setAttribute('dur','8000');
        doorOpenAnim.setAttribute('to',`${20*scaleX} ${10*scaleX} ${10*scaleZ}`);

        door.appendChild(doorOpenAnim);
        door.emit('markerOnScreen');
        this.calledOpen = true;
        setTimeout(function(){
          vaultDoor.emit('doorOpened');
        }.bind(this), 2500)
      }.bind(this));
    }
  });
