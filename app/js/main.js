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

AFRAME.registerComponent('open-on-scan', {
  init: function () {
    const door = document.querySelector('#door');
    const vaultDoor = document.querySelector('#vaultDoor');
    const doorOpen = document.querySelector('#doorOpen');
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
