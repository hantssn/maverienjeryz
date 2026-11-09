// ===== EDIT DI SINI =====
// Taruh foto di folder img/ dengan nama di bawah ini (atau ganti namanya di sini).
// Foto 1-2 tampil di surat, foto 1-4 tampil di galeri.
var PHOTOS=['img/foto1.jpg','img/foto2.jpg','img/foto3.jpg','img/foto4.jpg'];
var SINCE=new Date('2026-08-10T00:00:00');
var STORY=[['The beginning','The day our story started.'],['Month one','Learning each other, one conversation at a time.'],['Month two','More laughter, more memories.'],['Month three','Still choosing each other.']];
var TITLE_END='I love you so much, kakak sayang!';
// ========================
var $=function(i){return document.getElementById(i)};
var env=$('env'),ov=$('overlay'),title=$('title'),hint=$('hint'),opened=false;
var music=$('music'),musicToggle=$('music-toggle'),musicStatus=$('music-status');
function type(el,t){el.textContent='';var i=0;(function f(){if(i<=t.length){el.textContent=t.slice(0,i++);setTimeout(f,60)}})()}
function setMusicState(playing){
  musicToggle.textContent=playing?'♫ Jeda lagu':'♫ Putar lagu';
  musicToggle.setAttribute('aria-label',playing?'Jeda lagu':'Putar lagu');
  musicToggle.setAttribute('aria-pressed',String(playing));
}
function showMusicError(){
  musicStatus.textContent='File lagu belum tersedia. Tambahkan MP3 milikmu di audio/lagu.mp3.';
  musicStatus.hidden=false;
  setMusicState(false);
}
function playMusic(){
  music.play().then(function(){musicStatus.hidden=true}).catch(showMusicError);
}
music.addEventListener('error',showMusicError);
music.addEventListener('play',function(){setMusicState(true)});
music.addEventListener('pause',function(){setMusicState(false)});
musicToggle.onclick=function(){if(music.paused){playMusic()}else{music.pause()}};

for(var k=0;k<14;k++){var b=document.createElement('i'),s=8+Math.random()*26;
  b.style.cssText='left:'+Math.random()*100+'%;width:'+s+'px;height:'+s+'px;opacity:'+(.1+Math.random()*.2)+';animation-duration:'+(14+Math.random()*16)+'s;animation-delay:-'+Math.random()*20+'s';
  $('bokeh').appendChild(b)}

function photo(el,i){if(PHOTOS[i]){var im=new Image();im.alt='';im.onerror=function(){im.remove()};im.src=PHOTOS[i];el.appendChild(im)}}
document.querySelectorAll('[data-photo]').forEach(function(e){photo(e,+e.dataset.photo)});
for(var g=0;g<4;g++){var p=document.createElement('div');p.className='pola';p.innerHTML='<div class="ph"></div>';photo(p.firstChild,g);$('gal').appendChild(p)}
STORY.forEach(function(s){var d=document.createElement('div');d.innerHTML='<small>'+s[0]+'</small><p>'+s[1]+'</p>';$('tl').appendChild(d)});

function tick(){var s=Math.floor(Math.max(0,Date.now()-SINCE)/1000);
  $('cd').textContent=Math.floor(s/86400);$('ch').textContent=Math.floor(s%86400/3600);
  $('cm').textContent=Math.floor(s%3600/60);$('cs').textContent=s%60}
tick();setInterval(tick,1000);

var f=$('fill'),pr=0,ld=setInterval(function(){pr+=4+Math.random()*3;
  if(pr>=100){pr=100;clearInterval(ld);setTimeout(function(){var l=$('loader');l.style.opacity=0;setTimeout(function(){l.remove()},800);type(title,'You have a mail')},300)}
  f.style.width=pr+'%'},200);

env.onclick=function(){
  if(!opened){opened=true;env.classList.add('open');hint.textContent='tap again to read';playMusic();return}
  ov.classList.add('show');document.body.classList.add('lock')};
$('close').onclick=function(){
  ov.classList.remove('show');document.body.classList.remove('lock');
  env.classList.remove('open');opened=false;hint.textContent='';type(title,TITLE_END);
  $('more').classList.add('show');$('down').style.opacity=.6;
  setTimeout(function(){$('more').scrollIntoView({behavior:'smooth'})},2600)};
new IntersectionObserver(function(e,o){if(e[0].isIntersecting){$('bq').classList.add('go');o.disconnect()}},{threshold:.4}).observe($('bq'));
