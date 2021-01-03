const btnRight = document.querySelector('.arrow.right')
const btnLeft = document.querySelector('.arrow.left')
const track = document.querySelector('.track')
const indicators = document.getElementsByClassName('indic')

const qtdImg = document.getElementsByClassName('item').length
const amntPass = 100 / qtdImg

function getTranslateX() { // credit: https://stackoverflow.com/users/2008111/caramba

  const style = window.getComputedStyle(track)
  const matrix = new WebKitCSSMatrix(style.transform)
  return (matrix.m41/track.getBoundingClientRect().width * 100)

}

function getActive() {
  let n
  for (let i = 0; i < indicators.length; i++) {
    if(indicators[i].className === 'indic active') { n = i }
  }
  return n
}

function passRight() {

  const active = getActive()

  if( getTranslateX().toFixed(2) <= -((qtdImg-1) * amntPass).toFixed(2)  ) {
    track.style.transform = 'translateX(0)'
    indicators[active].className = 'indic'
    indicators[0].className = 'indic active'
  } else {
    track.style.transform = `translateX(${getTranslateX() - amntPass}%)`
    indicators[active].className = 'indic'
    indicators[active+1].className = 'indic active'
  }

}

function passLeft() {

  const active = getActive()

  if( getTranslateX().toFixed(2) >= 0  ) {
    track.style.transform = `translateX(${-((qtdImg-1) * amntPass)}%)`
    indicators[active].className = 'indic'
    indicators[indicators.length-1].className = 'indic active'
  } else {
    track.style.transform = `translateX(${getTranslateX() + amntPass}%)`
    indicators[active].className = 'indic'
    indicators[active-1].className = 'indic active'
  }

}

btnRight.addEventListener('click', passRight)

btnLeft.addEventListener('click', passLeft)

setInterval(passRight, 5000)
