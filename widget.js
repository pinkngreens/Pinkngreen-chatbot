(function () {
  const CONFIG = window.PNGChatConfig || {};
  const API_URL = CONFIG.apiUrl || 'https://pinkngreen-chatbot.vercel.app/api/chat';
  const PRIMARY = CONFIG.primaryColor || '#d4537e';
  const BOT_NAME = CONFIG.botName || "Pink'n Green Assistant";

  const style = document.createElement('style');
  style.textContent = `
    #png-bubble{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:${PRIMARY};border-radius:50%;cursor:pointer;z-index:99999;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(212,83,126,0.4);transition:transform 0.2s}
    #png-bubble:hover{transform:scale(1.08)}
    #png-bubble svg{width:26px;height:26px;fill:white}
    #png-win{position:fixed;bottom:90px;right:24px;width:360px;height:520px;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.18);z-index:99998;display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}
    #png-win.open{display:flex}
    .png-hdr{background:${PRIMARY};padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}
    .png-av{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
    .png-hn{color:#fff;font-weight:600;font-size:14px;margin:0}
    .png-hs{color:rgba(255,255,255,0.8);font-size:11px;margin:0}
    .png-lb{background:rgba(255,255,255,0.2);border:none;border-radius:12px;color:#fff;font-size:11px;padding:3px 8px;cursor:pointer;margin-left:auto}
    .png-cl{background:none;border:none;color:rgba(255,255,255,0.8);font-size:20px;cursor:pointer;padding:0}
    .png-body{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f9f9f9}
    .png-msg{max-width:85%;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.6;word-wrap:break-word}
    .png-msg.bot{background:#fff;border:1px solid #eee;border-bottom-left-radius:3px;align-self:flex-start;color:#333}
    .png-msg.bot.rtl{direction:rtl;text-align:right;border-bottom-left-radius:12px;border-bottom-right-radius:3px;align-self:flex-end}
    .png-msg.user{background:${PRIMARY};color:#fff;border-bottom-right-radius:3px;align-self:flex-end}
    .png-msg.user.rtl{direction:rtl;text-align:right;border-bottom-right-radius:12px;border-bottom-left-radius:3px}
    .png-prods{display:flex;flex-direction:column;gap:7px;align-self:flex-start;width:92%}
    .png-prods.rtl{align-self:flex-end;direction:rtl}
    .png-pcard{background:#fff;border:1px solid #eee;border-radius:10px;padding:9px;display:flex;align-items:center;gap:9px}
    .png-pimg{width:52px;height:52px;border-radius:8px;object-fit:cover;flex-shrink:0;background:#f5f5f5}
    .png-pinfo{flex:1;min-width:0}
    .png-pname{font-size:12px;font-weight:600;color:#333;margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .png-ptags{display:flex;flex-wrap:wrap;gap:3px;margin:2px 0}
    .png-ptag{font-size:10px;background:#fbeaf0;color:#72243e;padding:1px 6px;border-radius:8px}
    .png-pprice{font-size:11px;color:${PRIMARY};margin:0;font-weight:600}
    .png-pbtn{font-size:11px;padding:5px 10px;background:${PRIMARY};color:#fff;border:none;border-radius:6px;cursor:pointer;flex-shrink:0;text-decoration:none;display:inline-block}
    .png-quick{display:flex;flex-wrap:wrap;gap:5px;padding:8px 12px;background:#fff;border-top:1px solid #eee;flex-shrink:0}
    .png-qbtn{font-size:11px;padding:5px 10px;border-radius:20px;border:1px solid ${PRIMARY};color:${PRIMARY};background:#fbeaf0;cursor:pointer}
    .png-qbtn:hover{background:${PRIMARY};color:#fff}
    .png-irow{display:flex;align-items:center;gap:7px;padding:9px 12px;border-top:1px solid #eee;background:#fff;flex-shrink:0}
    .png-inp{flex:1;border:1px solid #ddd;border-radius:20px;padding:7px 13px;font-size:13px;outline:none;color:#333}
    .png-inp:focus{border-color:${PRIMARY}}
    .png-snd{width:32px;height:32px;border-radius:50%;background:${PRIMARY};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .png-snd svg{width:14px;height:14px;fill:white}
    .png-typing{display:flex;gap:4px;align-items:center;padding:9px 12px;background:#fff;border:1px solid #eee;border-radius:12px;border-bottom-left-radius:3px;align-self:flex-start}
    .png-dot{width:6px;height:6px;border-radius:50%;background:${PRIMARY};animation:pngB 1.2s infinite}
    .png-dot:nth-child(2){animation-delay:0.2s}.png-dot:nth-child(3){animation-delay:0.4s}
    @keyframes pngB{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
    @media(max-width:480px){#png-win{width:calc(100vw - 20px);right:10px;bottom:80px;height:70vh}}
  `;
  document.head.appendChild(style);

  let lang = 'en';
  const greetings = {
    en: "Hi! Welcome to Pink'n Green 🌸 Tell me your skin or hair concern and I'll recommend perfect products from our store!",
    ar: "أهلاً بك في Pink'n Green 🌸 أخبرني عن مشكلتك في البشرة أو الشعر وسأرشح لك المنتجات المثالية من متجرنا!"
  };
  const quickLabels = {
    en: [['Dandruff','dandruff'],['Oily skin','oily skin'],['Dry hair','dry hair'],['Acne','acne'],['Perfumes','perfume'],['Support','support']],
    ar: [['قشرة الشعر','عندي قشرة'],['بشرة دهنية','بشرتي دهنية'],['شعر جاف','شعري جاف'],['حب الشباب','عندي حب الشباب'],['عطور','عطر'],['الدعم','support']]
  };

  const bubble = document.createElement('div'); bubble.id='png-bubble';
  bubble.innerHTML='<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';

  const win = document.createElement('div'); win.id='png-win';
  win.innerHTML=`<div class="png-hdr"><div class="png-av">🌸</div><div><p class="png-hn" id="pngN">${BOT_NAME}</p><p class="png-hs" id="pngS">Here to help you glow ✨</p></div><button class="png-lb" id="pngL">عربي</button><button class="png-cl" id="pngX">×</button></div><div class="png-body" id="pngB"></div><div class="png-quick" id="pngQ"></div><div class="png-irow"><input class="png-inp" id="pngI" placeholder="Describe your concern..."/><button class="png-snd" id="pngSend"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div>`;

  document.body.appendChild(bubble);
  document.body.appendChild(win);

  const body=document.getElementById('pngB'), inp=document.getElementById('pngI');

  function addMsg(html,cls){const d=document.createElement('div');d.className='png-msg '+cls;d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;}
  function showTyping(){const d=document.createElement('div');d.className='png-typing';d.id='pngT';d.innerHTML='<div class="png-dot"></div><div class="png-dot"></div><div class="png-dot"></div>';body.appendChild(d);body.scrollTop=body.scrollHeight;}
  function hideTyping(){const t=document.getElementById('pngT');if(t)t.remove();}

  function renderQuick(){
    const q=document.getElementById('pngQ'); q.innerHTML='';
    quickLabels[lang].forEach(([label,query])=>{
      const b=document.createElement('button');b.className='png-qbtn';b.textContent=label;
      b.onclick=()=>send(query); q.appendChild(b);
    });
  }

  function renderProducts(data){
    const rtl=data.lang==='ar';
    addMsg(data.message,'bot'+(rtl?' rtl':''));
    const wrap=document.createElement('div'); wrap.className='png-prods'+(rtl?' rtl':'');
    data.products.forEach(p=>{
      const img=p.image?`<img class="png-pimg" src="${p.image}" alt="${p.name}" loading="lazy">`:'<div class="png-pimg" style="display:flex;align-items:center;justify-content:center;font-size:22px">🛍️</div>';
      const tags=(p.tags||[]).map(t=>`<span class="png-ptag">${t}</span>`).join('');
      wrap.innerHTML+=`<div class="png-pcard">${img}<div class="png-pinfo"><p class="png-pname">${p.name}</p><div class="png-ptags">${tags}</div><p class="png-pprice">${p.price}</p></div><a href="${p.url}" target="_blank" class="png-pbtn">${rtl?'عرض':'View'}</a></div>`;
    });
    body.appendChild(wrap); body.scrollTop=body.scrollHeight;
  }

  async function send(text){
    const rtl=/[\u0600-\u06FF]/.test(text);
    addMsg(text,'user'+(rtl?' rtl':''));
    showTyping();
    try{
      const res=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
      const data=await res.json(); hideTyping();
      if(data.type==='products'&&data.products?.length>0){renderProducts(data);}
      else if(data.type==='redirect'){
        const rtl2=data.lang==='ar';
        addMsg(data.message,'bot'+(rtl2?' rtl':''));
        addMsg(`<a href="${data.url}" target="_blank" style="color:${PRIMARY}">${data.urlText}</a>`,'bot'+(rtl2?' rtl':''));
      }
      else{addMsg((data.message||'').replace(/\n/g,'<br>'),'bot'+(data.lang==='ar'?' rtl':''));}
    }catch(e){hideTyping();addMsg("Sorry, I'm having trouble connecting. Please try again!",'bot');}
  }

  bubble.onclick=()=>{
    win.classList.toggle('open');
    if(win.classList.contains('open')&&body.children.length===0){
      addMsg(greetings[lang],'bot'+(lang==='ar'?' rtl':''));
      renderQuick();
    }
  };
  document.getElementById('pngX').onclick=()=>win.classList.remove('open');
  document.getElementById('pngSend').onclick=()=>{const t=inp.value.trim();if(t){inp.value='';send(t);}};
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const t=inp.value.trim();if(t){inp.value='';send(t);}}});
  document.getElementById('pngL').onclick=()=>{
    lang=lang==='en'?'ar':'en';
    document.getElementById('pngL').textContent=lang==='en'?'عربي':'English';
    document.getElementById('pngN').textContent=lang==='ar'?"مساعد Pink'n Green":BOT_NAME;
    document.getElementById('pngS').textContent=lang==='ar'?'هنا لمساعدتك ✨':'Here to help you glow ✨';
    inp.placeholder=lang==='ar'?'صِف مشكلتك...':'Describe your concern...';
    body.innerHTML='';
    addMsg(greetings[lang],'bot'+(lang==='ar'?' rtl':''));
    renderQuick();
  };
})();
