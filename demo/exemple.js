window.onload = function(){

  if(fetch) {
    fetch('https://api.github.com/repos/okazari/rythm.js/stats/contributors')
    .then(d => d.json())
    .then((data) => {
      const contributors = data.filter(d => d.author.login !== 'bplouzennec' && d.author.login !== 'Okazari')
      const contributor = contributors[Math.floor(Math.random() * contributors.length)].author
      document.getElementById('shout').innerHTML = `
        <div class="thanks">Thanks for your contribution !</div>
        <img class="contributor-avatar" src="${contributor.avatar_url}" />
        <div class="contributor-login"><a class="contributor-login-link" href="${contributor.html_url}">${contributor.login}</a></div>
      `
    })
  }

  var rythm = new Rythm();
  var audio = document.getElementById('audio');

  rythm.addRythm('pulse1','pulse',0,10)
  rythm.addRythm('pulse2','pulse',0,10, { min: 0.1, max: 1 })
  rythm.addRythm('pulse3','pulse',0,10, { min: 1, max: 1.75 })
  rythm.addRythm('jump1','jump',0,10)
  rythm.addRythm('jump2','jump',150, 40, { min: -20, max: 20 })
  rythm.addRythm('shake1','shake',0,10)
  rythm.addRythm('shake2','shake',0,10, { min: 0, max: 20 })
  rythm.addRythm('shake3','shake',0,10, { direction: 'left' })
  rythm.addRythm('twist1','twist',0,10)
  rythm.addRythm('twist2','twist',0,10, { min: 20, max: 180 })
  rythm.addRythm('twist3','twist',0,10, { direction: 'left' })
  rythm.addRythm('vanish1','vanish',0,10)
  rythm.addRythm('vanish2','vanish',0,10, { reverse: true })
  rythm.addRythm('color1','color',0,10)
  rythm.addRythm('color2','color',0,10, { from: [0,0,255], to:[255,0,255] })
  rythm.addRythm('color3','color',0,10, { from: [255,255,0], to:[255,0,0] })
  rythm.addRythm('radius1', 'radius', 0, 10, { min: 0, max: 30 })
  rythm.addRythm('radius2', 'radius', 0, 10, { reverse: true, min: 0, max: 30 })
  rythm.addRythm('blur1', 'blur', 0, 10)
  rythm.addRythm('blur2', 'blur', 0, 10, { reverse: true })
  rythm.addRythm('blur3', 'blur', 0, 10, { max: 16 })
  rythm.addRythm('swing1', 'swing', 0, 10)
  rythm.addRythm('swing2', 'swing', 0, 10, { curve: 'up' })
  rythm.addRythm('swing3', 'swing', 0, 10, { direction: 'left' })
  rythm.addRythm('swing4', 'swing', 0, 10, { radius: 10 })
  rythm.addRythm('thanks','shake',0,10, { min: -10, max: 10 })
  rythm.addRythm('contributor-avatar', 'pulse', 0, 10, { min: 0.5, max: 1.1 })
  rythm.addRythm('contributor-login-link','jump',0,10, { min: -15, max: 0 })

  var onMicClick = function(){
    if(rythm.stopped === false){
      rythm.stop();
    }
    rythm.plugMicrophone().then(function(){
      rythm.start();
    })
  }

  var onStartClick = function(){
    if(rythm.stopped === false){
      rythm.stop();
    }
    // rythm.connectExternalAudioElement(audio)
    rythm.setMusic("./samples/rythmC.mp3");
    rythm.setGain(0.1)
    rythm.start();
  }

  var onStopClick = function(){
    if(rythm.stopped === false){
      rythm.stop();
    }
  }

  var onStopResetClick = function(){
    if(rythm.stopped === false){
      rythm.stop(true);
    }
  }

  document.getElementById('mic').addEventListener('click', onMicClick)
  document.getElementById('micBottom').addEventListener('click', onMicClick)
  document.getElementById('start').addEventListener('click', onStartClick)
  document.getElementById('startBottom').addEventListener('click', onStartClick)
  document.getElementById('stop').addEventListener('click', onStopClick)
  document.getElementById('stopBottom').addEventListener('click', onStopClick)

  var bottomPlayerShow = false
  var showPoint = 205
  document.addEventListener('scroll', function(){
    var body = document.body
    var bottomPlayer = document.getElementById('playerBottom')
    var shouldShow = !bottomPlayerShow && body.scrollTop > showPoint
    var shouldHide = bottomPlayerShow && body.scrollTop <= showPoint
    if(shouldShow) {
      bottomPlayerShow = true
      bottomPlayer.className = 'show'
    } else if (shouldHide) {
      bottomPlayerShow = false
      bottomPlayer.className = ''
    }
  })
}
