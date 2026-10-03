(()=>{
 let progress=0,running=false,frame=0,last=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function paint(){ $('sunsetTwilight').style.opacity=String(progress/100);$('sunsetTime').value=String(Math.round(progress));$('sunsetPause').textContent=running?'Pause sunset':'Play sunset'; }
 function stop(){running=false;cancelAnimationFrame(frame);paint();}
 function tick(now){if(!running||!$('sunsetDialog').open)return;if(last)progress=Math.min(100,progress+(now-last)/300);last=now;paint();if(progress===100){stop();return;}frame=requestAnimationFrame(tick);}
 function play(){if(progress>=100)progress=0;running=true;last=0;paint();frame=requestAnimationFrame(tick);}
 $('windowView').onclick=()=>{stopChoir();$('voice').pause();openDialog('sunsetDialog','windowView');stop();progress=0;paint();if(!reduced)play();};
 $('sunsetPause').onclick=()=>running?stop():play();
 $('sunsetReplay').onclick=()=>{stop();progress=0;paint();play();};
 $('sunsetTime').oninput=()=>{const value=Number($('sunsetTime').value);stop();progress=value;paint();};
 $('sunsetDialog').addEventListener('close',stop);
 window.addEventListener('pagehide',stop);paint();
})();
