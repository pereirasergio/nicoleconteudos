(function(){
  var STORAGE_KEY = 'nicole-entregas-v2';

  // Each pending item can have "subitems" — individual video clips that must
  // be recorded for that post. The item's own checkbox ("master") is derived:
  // done when every subitem is checked. Clicking the master toggles all
  // subitems on/off together. An item with no subitems (a single continuous
  // video) uses one hidden synthetic subitem so the same logic covers it.
  var ITEMS = [
    {
      id: "2026-10-05-roteiro",
      date: "Seg, 05 de out",
      deadline: "03/10",
      title: "Extensão de pestanas, sobrancelhas e brow lamination",
      formato: "Nicole começa falando para a câmera. Depois entram takes dos procedimentos e dos resultados, com a fala dela em off.",
      foco: "Extensão de pestanas, design de sobrancelhas e brow lamination.",
      subitems: [
        { id: "s1", text: "Cena 1 — gancho olhando pra câmera: “sente que falta alguma coisa no seu olhar?”" },
        { id: "s2", text: "Cena 2 — segue na câmera, contando a própria experiência" },
        { id: "s3", text: "Cena 3 — takes da extensão de pestanas: aplicação + resultado real" },
        { id: "s4", text: "Cena 4 — takes do design de sobrancelhas e da brow lamination" },
        { id: "s5", text: "Cena 5 — montagem dos resultados + Nicole volta à câmera com CTA (WhatsApp, Braga)" }
      ]
    },
    {
      id: "2026-10-07-roteiro",
      date: "Qua, 07 de out",
      deadline: "03/10",
      title: "Dia real de atendimentos (bastidores)",
      formato: "Sem falar pra câmera nem decorar roteiro — a narração é montada depois em cima das imagens. Vídeos na vertical, takes curtos, som não é prioridade.",
      subitems: [
        { id: "s1", text: "Abertura: selfie rápida com tchauzinho OU só imagens trabalhando, sem falar nada" },
        { id: "s2", text: "Em cada atendimento: procedimento + resultado, variando ângulos (de cima, de lado, mais aberto)" },
        { id: "s3", text: "Reação da cliente ao resultado — se puder virar depoimento, manter o áudio (confirmar autorização antes de publicar)" },
        { id: "s4", text: "Bastidores entre clientes: higienizar a maca, organizar materiais, detalhes do estúdio, uma pausa" },
        { id: "s5", text: "Fechamento no fim do expediente: organizando o espaço, apagando as luzes ou um tchau pra câmera" }
      ],
      ref: true
    },
    {
      id: "2026-10-09-roteiro",
      date: "Sex, 09 de out",
      deadline: "03/10",
      title: "Vídeo em tópicos, estilo orgânico (selfie)",
      formato: "Modo selfie, falando em tópicos — bem parecido com a referência. Vídeo único e contínuo (não precisa gravar em partes separadas).",
      foco: "Tema: “coisas que eu não acho normal sendo especialista em pestanas e sobrancelhas”.",
      pontos: [
        "Achar que toda extensão de pestanas fica artificial",
        "Achar que tirar uns pelinhos da sobrancelha em casa é igual a fazer num studio",
        "Não estar satisfeita com o olhar e achar que não tem o que fazer",
        "Ter medo de brow lamination por causa de uma sobrancelha arrepiada que viu na internet",
        "Fazer as pestanas e esquecer da manutenção",
        "Não se cuidar por “falta de tempo”"
      ],
      ref: true
    }
  ];

  // Items with no explicit "subitems" get one synthetic entry, so the same
  // done/toggle logic works uniformly for every item.
  ITEMS.forEach(function(item){
    if (!item.subitems) item.subitems = [{ id: "_single", text: null }];
  });

  var APPROVED = [
    {date:"Sáb, 03 de out", type:"FOTOS"},
    {date:"Sáb, 03 de out · 18h00", type:"FOTOS"},
    {date:"Qui, 08 de out · 14h00", type:"FOTOS"},
    {date:"Seg, 12 de out", type:"VIDEOS"},
    {date:"Ter, 13 de out", type:"VIDEOS"},
    {date:"Qui, 15 de out", type:"FOTOS"},
    {date:"Sex, 16 de out", type:"VIDEOS"},
    {date:"Seg, 19 de out", type:"FOTOS"},
    {date:"Ter, 20 de out", type:"VIDEOS"},
    {date:"Qui, 22 de out", type:"VIDEOS"},
    {date:"Sex, 23 de out", type:"VIDEOS"},
    {date:"Seg, 26 de out", type:"FOTOS"},
    {date:"Ter, 27 de out", type:"VIDEOS"},
    {date:"Qui, 29 de out", type:"VIDEOS"},
    {date:"Sex, 30 de out", type:"FOTOS"}
  ];

  function loadState(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function saveState(){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // state = { "<itemId>": ["<subId checked>", ...] }
  var state = loadState();
  var openIds = {};

  function checkedSubs(itemId){
    return Array.isArray(state[itemId]) ? state[itemId] : [];
  }

  function isSubChecked(itemId, subId){
    return checkedSubs(itemId).indexOf(subId) !== -1;
  }

  function isItemDone(item){
    var checked = checkedSubs(item.id);
    return item.subitems.every(function(s){ return checked.indexOf(s.id) !== -1; });
  }

  function toggleSub(itemId, subId){
    var checked = checkedSubs(itemId).slice();
    var idx = checked.indexOf(subId);
    if (idx === -1) checked.push(subId); else checked.splice(idx, 1);
    state[itemId] = checked;
    saveState();
    renderAll();
  }

  function toggleMaster(item){
    if (isItemDone(item)) {
      state[item.id] = [];
    } else {
      state[item.id] = item.subitems.map(function(s){ return s.id; });
    }
    saveState();
    renderAll();
  }

  function checkSvg(){
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function esc(s){
    return String(s).replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; });
  }

  function renderDetails(item){
    var html = '';
    if (item.formato) html += '<h4>Formato</h4><p>' + esc(item.formato) + '</p>';
    if (item.foco) html += '<h4>Foco</h4><p>' + esc(item.foco) + '</p>';

    var hasVisibleSubitems = item.subitems.length && item.subitems[0].id !== '_single';
    if (hasVisibleSubitems){
      html += '<h4>Vídeos a gravar</h4><div class="sublist" data-item="' + esc(item.id) + '">';
      item.subitems.forEach(function(s){
        var done = isSubChecked(item.id, s.id);
        html += '<div class="subitem" data-sub="' + esc(s.id) + '" data-done="' + done + '" role="button" tabindex="0">' +
          '<span class="subcheck">' + checkSvg() + '</span>' +
          '<span class="subitem-text">' + esc(s.text) + '</span>' +
        '</div>';
      });
      html += '</div>';
    } else if (item.pontos && item.pontos.length){
      html += '<h4>Roteiro</h4><ul>';
      item.pontos.forEach(function(p){ html += '<li>' + esc(p) + '</li>'; });
      html += '</ul>';
    }

    if (item.ref){
      html += '<a class="ref-link" href="https://aprovapost.com.br/13527/cliente/nicole-kentta/" target="_blank" rel="noopener">Ver referência no painel →</a>';
    }
    return html;
  }

  function renderPending(){
    var list = document.getElementById('pending-list');
    list.innerHTML = '';
    ITEMS.forEach(function(item){
      var done = isItemDone(item);
      var open = !!openIds[item.id];
      var hasVisibleSubitems = item.subitems.length && item.subitems[0].id !== '_single';
      var checkedCount = checkedSubs(item.id).length;
      var totalCount = item.subitems.length;

      var statusText;
      if (done) {
        statusText = 'Material entregue';
      } else if (hasVisibleSubitems) {
        statusText = checkedCount + '/' + totalCount + ' vídeos gravados';
      } else {
        statusText = 'Aguardando gravação';
      }

      var card = document.createElement('div');
      card.className = 'card pending';
      card.dataset.done = done ? 'true' : 'false';
      card.dataset.open = open ? 'true' : 'false';

      var row = document.createElement('div');
      row.className = 'card-row';
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      row.innerHTML =
        '<div class="check" data-role="check">' + checkSvg() + '</div>' +
        '<div class="card-main">' +
          '<div class="card-top">' +
            '<span class="deadline-badge">Prazo: ' + esc(item.deadline) + '</span>' +
            '<span class="tag">Vídeo</span>' +
          '</div>' +
          '<div class="title">' + esc(item.title) + '</div>' +
          '<div class="launch-date">Vai ao ar: ' + esc(item.date) + '</div>' +
          '<div class="status-line' + (done ? ' done' : '') + '">' + statusText + '</div>' +
        '</div>' +
        '<div class="chevron">▾</div>';

      row.addEventListener('click', function(ev){
        if (ev.target.closest('[data-role="check"]')) return;
        openIds[item.id] = !openIds[item.id];
        renderPending();
      });

      var checkEl = row.querySelector('[data-role="check"]');
      checkEl.addEventListener('click', function(ev){
        ev.stopPropagation();
        toggleMaster(item);
      });

      var details = document.createElement('div');
      details.className = 'details';
      details.innerHTML = renderDetails(item);

      details.querySelectorAll('.subitem').forEach(function(el){
        el.addEventListener('click', function(ev){
          ev.stopPropagation();
          toggleSub(item.id, el.dataset.sub);
        });
        el.addEventListener('keydown', function(ev){
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            toggleSub(item.id, el.dataset.sub);
          }
        });
      });

      card.appendChild(row);
      card.appendChild(details);
      list.appendChild(card);
    });
  }

  function renderApproved(){
    var list = document.getElementById('approved-list');
    list.innerHTML = '';
    APPROVED.forEach(function(a){
      var row = document.createElement('div');
      row.className = 'card';
      var isFoto = a.type === 'FOTOS';
      row.innerHTML =
        '<div class="copy-row">' +
          '<div class="dot">' + (isFoto ? '·' : '<span class="check-mini">' + checkSvg() + '</span>') + '</div>' +
          '<div class="card-main">' +
            '<div class="card-top"><span class="date">' + esc(a.date) + '</span><span class="tag ' + (isFoto ? 'copy' : '') + '">' + a.type + '</span></div>' +
            '<div class="title muted">' + (isFoto ? 'Fotos definidas pela agência' : 'Vídeo aprovado pela agência') + '</div>' +
          '</div>' +
        '</div>';
      list.appendChild(row);
    });
  }

  function updatePendingCount(){
    var remaining = ITEMS.filter(function(item){ return !isItemDone(item); }).length;
    document.getElementById('pending-count').textContent = remaining;
  }

  function renderAll(){
    renderPending();
    renderApproved();
    updatePendingCount();
  }

  renderAll();
})();
