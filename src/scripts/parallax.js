const parallax = document.querySelectorAll('.parallax');

const layersMountains = parallax[0].children;
const layersBudda = parallax[1].children;
const top = parallax[1].getBoundingClientRect();


function moveLayersDependsOnScroll(wScroll) {
  Array.from(layersMountains).forEach(layer => {
    const divider = layer.dataset.speed;
    const strafe = wScroll * divider / 10;

    layer.style.transform = `translateY(-${strafe}%)`
  })
};

function moveLayersDependsOnScrollBudda() {
  const top = parallax[1].getBoundingClientRect().y;
  
  Array.from(layersBudda).forEach(layer => {  
    const divider = layer.dataset.speed;
    if (top < 0) {
      const strafe = Math.abs(top) * divider / 10;
      layer.style.transform = `translateY(-${strafe}%)`
    }
  })
};

window.addEventListener('scroll', e => {
  const wScroll = window.pageYOffset;
  
  moveLayersDependsOnScroll(wScroll);
  moveLayersDependsOnScrollBudda(wScroll);
});