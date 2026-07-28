
// Smooth 0 → 400+ active users counter
const userCounter=document.querySelector(".user-counter");
if(userCounter){
  const target=Number(userCounter.dataset.target||400);
  const start=performance.now(), duration=1800;
  const tick=now=>{
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,4);
    userCounter.textContent=Math.floor(target*eased);
    if(p<1) requestAnimationFrame(tick);
    else userCounter.textContent=target;
  };
  requestAnimationFrame(tick);
}
window.addEventListener("load",()=>setTimeout(()=>{const l=document.getElementById("loader");l.style.opacity="0";l.style.visibility="hidden"},1400));
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const payoutMap={30:"110",50:"210",70:"290",100:"460"};
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});$$(".reveal").forEach(e=>observer.observe(e));
const logoCard=$("#logoCard");document.addEventListener("mousemove",e=>{if(innerWidth>700){const x=(innerWidth/2-e.clientX)/45,y=(innerHeight/2-e.clientY)/45;logoCard.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`}});document.addEventListener("mouseleave",()=>logoCard.style.transform="rotate(0)");
const reviews=[["c1.jpg","CLIENT REVIEW 01","Direct Deliverd and Legit"],["c2.jpg","CLIENT REVIEW 02","100% Legit and Worth it"],["c3.jpg","CLIENT REVIEW 03","Legit i have made about 6k in 1 month bc of Draco"],["c4.jpg","CLIENT REVIEW 04","He was offline when i texted him but order deliverd and Legit"],["c5.jpg","CLIENT REVIEW 05","If you want top make money thisss shit its crazyyy"]];
let reviewIndex=0;const dots=$("#reviewDots");reviews.forEach((_,i)=>{const d=document.createElement("span");if(!i)d.className="active";dots.appendChild(d)});
function renderReview(){const r=reviews[reviewIndex];$("#reviewImage").src=r[0];$("#reviewImage").onerror=()=>$("#reviewImage").src="assets/draco-thumbnail.jpeg";$("#reviewText").textContent=r[2];$("#reviewName").textContent=r[1];$("#reviewNumber").textContent=String(reviewIndex+1).padStart(2,"0")+" / 05";[...dots.children].forEach((d,i)=>d.classList.toggle("active",i===reviewIndex))}
$("#prevReview").onclick=()=>{reviewIndex=(reviewIndex+reviews.length-1)%reviews.length;renderReview()};$("#nextReview").onclick=()=>{reviewIndex=(reviewIndex+1)%reviews.length;renderReview()};
const modal=$("#modal"),offerStep=$("#offerStep"),cryptoStep=$("#cryptoStep"),summary=$("#purchaseSummary"),payAmount=$("#payAmount"),getAmount=$("#getAmount"),payoutBenefit=$("#payoutBenefit");
$$(".offer-btn").forEach(btn=>btn.onclick=()=>{modal.classList.add("open");$("#modalTitle").innerHTML=btn.closest(".product").dataset.product.replace(" ","<br>");summary.classList.remove("show");cryptoStep.classList.remove("open");offerStep.style.display="block";$$(".price-grid button").forEach(x=>x.classList.remove("selected"))});
$("#closeModal").onclick=()=>modal.classList.remove("open");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
$$(".price-grid button").forEach(btn=>btn.onclick=()=>{
  $$(".price-grid button").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");
  const price=btn.dataset.price;
  const payout=btn.dataset.payout||payoutMap[price];
  payAmount.textContent="$"+price;
  getAmount.textContent="$"+payout;
  payoutBenefit.textContent="$"+payout;
  summary.classList.add("show");
});
$("#payButton").onclick=()=>{offerStep.style.display="none";cryptoStep.classList.add("open")};$("#backToOffers").onclick=()=>{cryptoStep.classList.remove("open");offerStep.style.display="block"};
$$(".network-tabs button").forEach(tab=>tab.onclick=()=>{
  $$(".network-tabs button").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active");
  const network=tab.dataset.network;
  $$(".crypto-row").forEach(row=>row.classList.toggle("active-network",row.dataset.network===network));
});
$$(".crypto-row").forEach(row=>row.onclick=async()=>{
  const address=row.dataset.address;
  try{await navigator.clipboard.writeText(address)}
  catch{const t=document.createElement("textarea");t.value=address;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove()}
  const status=row.querySelector(".address-status"),icon=row.querySelector("i");
  row.classList.add("copied");status.textContent="Address Copied";icon.textContent="✓";
  setTimeout(()=>{row.classList.remove("copied");status.textContent="Address";icon.textContent="⧉"},1000);
});

const header=document.querySelector(".header");
const progress=document.getElementById("scrollProgress");
function updateScrollUI(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const p=max>0?(scrollY/max)*100:0;
  if(progress) progress.style.width=p+"%";
  if(header) header.classList.toggle("scrolled",scrollY>45);
}
addEventListener("scroll",updateScrollUI,{passive:true});
updateScrollUI();
