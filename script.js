const textEl=document.getElementById("text");
const voiceEl=document.getElementById("voice");
const rateEl=document.getElementById("rate");
const pitchEl=document.getElementById("pitch");
const volumeEl=document.getElementById("volume");
const rateVal=document.getElementById("rateVal");
const pitchVal=document.getElementById("pitchVal");
const volumeVal=document.getElementById("volumeVal");
const charCount=document.getElementById("charCount");
const wordCount=document.getElementById("wordCount");
const durationEstimate=document.getElementById("durationEstimate");
const totalCharsEl=document.getElementById("totalChars");
const spokenCharsEl=document.getElementById("spokenChars");
const progressBar=document.getElementById("progressBar");
const statusEl=document.getElementById("status");
const elapsedEl=document.getElementById("elapsed");
const speakBtn=document.getElementById("speak");
const pauseBtn=document.getElementById("pause");
const resumeBtn=document.getElementById("resume");
const stopBtn=document.getElementById("stop");
const clearBtn=document.getElementById("clear");
const themeToggle=document.getElementById("themeToggle");
let voices=[];
let currentUtterance=null;
let startMs=0;
let timer=null;
function formatSeconds(s){return (Math.max(0,s)).toFixed(1)+"s"}
function countWords(t){const m=t.trim().match(/\b\w+[\w'\-]*\b/g);return m?m.length:0}
function updateMetrics(){const t=textEl.value;const c=t.length;const w=countWords(t);charCount.textContent=String(c);wordCount.textContent=String(w);const cps=13*parseFloat(rateEl.value);const est=c>0?c/Math.max(1e-6,cps):0;durationEstimate.textContent=formatSeconds(est);totalCharsEl.textContent=String(c)}
function setStatus(s){statusEl.textContent=s}
function updateSliders(){rateVal.textContent=rateEl.value;pitchVal.textContent=pitchEl.value;volumeVal.textContent=volumeEl.value}
function loadVoices(){voices=window.speechSynthesis.getVoices();voiceEl.innerHTML="";voices.forEach((v,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=(v.name+" "+(v.lang||"")).trim();voiceEl.appendChild(o)});const saved=localStorage.getItem("tts_voice_index");if(saved&&voices[Number(saved)]){voiceEl.value=saved}}
function ensureVoices(){loadVoices();if(!voices.length){setTimeout(ensureVoices,200)}}
function startTimer(){stopTimer();startMs=performance.now();timer=setInterval(()=>{elapsedEl.textContent=formatSeconds((performance.now()-startMs)/1000)},100)}
function stopTimer(){if(timer){clearInterval(timer);timer=null}}
function resetProgress(){spokenCharsEl.textContent="0";progressBar.style.width="0%";elapsedEl.textContent=formatSeconds(0)}
function speak(){const t=textEl.value;if(!t.trim())return;window.speechSynthesis.cancel();currentUtterance=new SpeechSynthesisUtterance(t);const vi=Number(voiceEl.value||0);if(voices[vi])currentUtterance.voice=voices[vi];currentUtterance.rate=parseFloat(rateEl.value);currentUtterance.pitch=parseFloat(pitchEl.value);currentUtterance.volume=parseFloat(volumeEl.value);localStorage.setItem("tts_voice_index",String(vi));resetProgress();setStatus("Speaking");startTimer();currentUtterance.onboundary=e=>{if(typeof e.charIndex==="number"){spokenCharsEl.textContent=String(e.charIndex);const total=Number(totalCharsEl.textContent||0);const pct=total?Math.min(100,(e.charIndex/total)*100):0;progressBar.style.width=pct+"%"}};currentUtterance.onend=()=>{spokenCharsEl.textContent=totalCharsEl.textContent;progressBar.style.width="100%";setStatus("Completed");stopTimer()};currentUtterance.onpause=()=>setStatus("Paused");currentUtterance.onresume=()=>setStatus("Speaking");currentUtterance.onerror=()=>{setStatus("Error");stopTimer()};window.speechSynthesis.speak(currentUtterance)}
function pause(){if(window.speechSynthesis.speaking&&!window.speechSynthesis.paused){window.speechSynthesis.pause()}}
function resume(){if(window.speechSynthesis.paused){window.speechSynthesis.resume()}}
function stop(){window.speechSynthesis.cancel();setStatus("Idle");stopTimer();resetProgress()}
textEl.addEventListener("input",()=>{updateMetrics()});
rateEl.addEventListener("input",()=>{updateSliders();updateMetrics()});
pitchEl.addEventListener("input",()=>{updateSliders()});
volumeEl.addEventListener("input",()=>{updateSliders()});
voiceEl.addEventListener("change",()=>{localStorage.setItem("tts_voice_index",voiceEl.value)});
speakBtn.addEventListener("click",()=>speak());
pauseBtn.addEventListener("click",()=>pause());
resumeBtn.addEventListener("click",()=>resume());
stopBtn.addEventListener("click",()=>stop());
clearBtn.addEventListener("click",()=>{textEl.value="";updateMetrics();resetProgress();setStatus("Idle")});
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){speak()}});
window.speechSynthesis.onvoiceschanged=loadVoices;
ensureVoices();
updateMetrics();
updateSliders();
function applyTheme(t){document.body.classList.toggle("theme-b",t==="b");document.body.classList.toggle("theme-c",t==="c")}
function initTheme(){const t=localStorage.getItem("tts_theme")||"b";applyTheme(t)}
themeToggle.addEventListener("click",()=>{const cur=document.body.classList.contains("theme-c")?"c":(document.body.classList.contains("theme-b")?"b":"a");const nxt=cur==="a"?"b":(cur==="b"?"c":"a");applyTheme(nxt);localStorage.setItem("tts_theme",nxt)});
initTheme();

