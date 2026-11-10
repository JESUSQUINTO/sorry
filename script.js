(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var AC = window.AudioContext || window.webkitAudioContext, ctx = null;
  var scale = [261.6,293.7,329.6,392,440,523.3,587.3,659.3,784];
  function note(f){
    try{
      if(!AC) return; if(!ctx) ctx = new AC(); if(ctx.state==='suspended') ctx.resume();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(.0001,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.25,ctx.currentTime+.02);
      g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.6);
      o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+.65);
    }catch(e){}
  }
  var rnd = function(a){return a[Math.floor(Math.random()*a.length)]};
  var EM = ['💖','💗','✨','🌸','⭐','🦋','🍓','🌈','💫','🥰','🎀','💕'];
  function burst(x,y,set,n){
    if(reduce) n = Math.min(n||8,4);
    n = n||10; set = set||EM;
    for(var i=0;i<n;i++){
      var s = document.createElement('span'); s.className='p'; s.textContent = rnd(set);
      document.body.appendChild(s);
      var a = Math.random()*Math.PI*2, d = 60+Math.random()*120, r = (Math.random()-.5)*160;
      s.animate([
        {transform:'translate('+(x-16)+'px,'+(y-16)+'px) scale(.4)',opacity:1},
        {transform:'translate('+(x-16+Math.cos(a)*d)+'px,'+(y-16+Math.sin(a)*d-40)+'px) rotate('+r+'deg) scale(1.2)',opacity:0}
      ],{duration:800+Math.random()*500,easing:'cubic-bezier(.2,.8,.4,1)'}).onfinish = (function(el){return function(){el.remove()}})(s);
    }
  }
  function buzz(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms||15);}catch(e){} }
  // Touch anywhere = magic
  document.addEventListener('pointerdown',function(e){
    if(e.target.id==='nm') return;
    burst(e.clientX,e.clientY,EM,8); note(rnd(scale)); buzz(10);
  });
  // Squeeze heart
  var hugs=0, h=document.getElementById('h'), hc=document.getElementById('hc');
  var hmsg=['hugs','hugs','hugs'];
  document.getElementById('hearts').addEventListener('pointerdown',function(){
    hugs++; h.style.transform='scale(.7)'; setTimeout(function(){h.style.transform='scale(1.25)'},100); setTimeout(function(){h.style.transform='scale(1)'},260);
    hc.textContent = hugs+(hugs===1?' hug':' hugs')+(hugs===10?' — I’m blushing 🥺':hugs===25?' — mali po ako  🍝':hugs===50?' — patawad po 💍':'');
  });
  // Reasons
  var reasons=['Your smile fixes my whole day.','You laugh and the room gets brighter.','You’re my favorite person to talk to.','You make ordinary days feel special.','You’re cuter when you’re confused.','I’m proud of you. Always.','You’re my home.','Every day with you is a good day.','You’re stronger than you think.','You make me want to be better.','I’d pick you again. Every time.','Your hugs are the best place on Earth.'];
  var colors=['#ffd6e7','#e5dcff','#c9f7e8','#fff1b8','#ffd9c7'], ri=0, rc=0;
  var rt=document.getElementById('reasons'), rm=document.getElementById('rm');
  rt.addEventListener('pointerdown',function(){
    rm.textContent=reasons[ri++%reasons.length]; rt.style.background=colors[rc++%colors.length]; rm.style.color='#3a1450';
    rt.querySelector('h2').style.color='#3a1450';
  });
  // Face
  var faces=['😭','🥱','🥰','😜','🤪','😻','🥹','😎','🤭','😇'], fe=document.getElementById('fe');
  document.getElementById('face').addEventListener('pointerdown',function(){
    fe.textContent=rnd(faces);
    if(!reduce) fe.animate([{transform:'rotate(-15deg) scale(1.2)'},{transform:'rotate(15deg) scale(1.2)'},{transform:'rotate(0) scale(1)'}],{duration:350});
  });
  // Blob
  var sh=document.getElementById('sh'), bc=['#ff4f8b','#b9a4ff','#6fe3c1','#ffd23f','#ff9a5c','#5cb8ff'];
  document.getElementById('blob').addEventListener('pointerdown',function(){
    var r=function(){return 20+Math.random()*60+'%'};
    sh.style.borderRadius=r()+' '+r()+' '+r()+' '+r()+' / '+r()+' '+r()+' '+r()+' '+r();
    sh.style.background=rnd(bc); sh.style.transform='rotate('+Math.round(Math.random()*90)+'deg) scale('+(.8+Math.random()*.5)+')';
  });
  // Balloons
  var bs=document.getElementById('bs'), bl=['🎈','🎈','🎈','🎈','🎈'];
  function addB(){
    var b=document.createElement('span'); b.className='b'; b.textContent='🎈';
    b.style.filter='hue-rotate('+Math.floor(Math.random()*360)+'deg)';
    b.addEventListener('pointerdown',function(e){
      e.stopPropagation(); var r=b.getBoundingClientRect();
      burst(r.left+r.width/2,r.top+r.height/2,['🎉','✨','💥','🎊','💖'],14); note(rnd(scale)*2); buzz(25);
      b.remove(); setTimeout(addB,1400);
    });
    bs.appendChild(b);
  }
  for(var i=0;i<bl.length;i++) addB();
  // Piano
  var ks=document.getElementById('ks'), kc=['#ff4f8b','#ff9a5c','#ffd23f','#6fe3c1','#5cb8ff','#b9a4ff','#ff8fd0'];
  kc.forEach(function(c,i){
    var k=document.createElement('div'); k.className='k'; k.style.background=c;
    k.addEventListener('pointerdown',function(e){
      e.stopPropagation(); note(scale[i]); buzz(8);
      var r=k.getBoundingClientRect(); burst(r.left+r.width/2,r.top,['🎵','🎶','💖'],4);
    });
    ks.appendChild(k);
  });
  // Sorry text appears wherever she touches
  var sorries=['sorry 🥺','I’m sorry','sorry, baby kc ','mali ko po yun','sorry talaga','sorry baby 💔','I love you, sorry'];
  function sorryText(x,y){
    var s=document.createElement('div'); s.className='sorry'; s.textContent=rnd(sorries);
    document.body.appendChild(s);
    var w=120, px=Math.max(8,Math.min(x-w/2,window.innerWidth-w-60));
    s.animate([{transform:'translate('+px+'px,'+(y-20)+'px) scale(.6)',opacity:0},{transform:'translate('+px+'px,'+(y-60)+'px) scale(1)',opacity:1,offset:.25},{transform:'translate('+px+'px,'+(y-130)+'px) scale(1)',opacity:0}],{duration:1600,easing:'ease-out'}).onfinish=function(){s.remove()};
  }
  document.addEventListener('pointerdown',function(e){ if(e.target.id!=='nm') sorryText(e.clientX,e.clientY); });
  // Apology card
  var sl=['I’m sorry 🥺','I hurt you, and I hate that.','You matter more than being right.','I’ll do better. I promise.','Can you forgive me? 💐'], si=0, sm=document.getElementById('sm');
  document.getElementById('sorry').addEventListener('pointerdown',function(){
    sm.textContent=sl[si++%sl.length];
    if(si===sl.length){ var r=this.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height/2,['💐','💖','🥹','🌹'],20); }
  });
  // Name tap = highlight
  document.getElementById('nm').addEventListener('focus',function(){ var s=window.getSelection(),r=document.createRange(); r.selectNodeContents(this); s.removeAllRanges(); s.addRange(r); });
})();