(function(){
  var STORAGE_KEY = 'nicole-entregas-v1';

  var ITEMS = [
    {
      id: "2026-10-05-roteiro",
      date: "Seg, 05 de out",
      deadline: "Prazo no painel: 03/10",
      title: "Extensão de pestanas, sobrancelhas e brow lamination",
      details: {
        formato: "Nicole começa falando para a câmera. Depois entram takes dos procedimentos e dos resultados, com a fala dela em off.",
        foco: "Extensão de pestanas, design de sobrancelhas e brow lamination.",
        pontos: [
          "Cena 1 — gancho olhando pra câmera: “sente que falta alguma coisa no seu olhar?”",
          "Cena 2 — segue na câmera, contando a própria experiência",
          "Cena 3 — takes da extensão de pestanas: aplicação + resultado real",
          "Cena 4 — takes do design de sobrancelhas e da brow lamination",
          "Cena 5 — montagem dos resultados + Nicole volta à câmera com CTA (WhatsApp, Braga)"
        ]
      }
    },
    {
      id: "2026-10-07-roteiro",
      date: "Qua, 07 de out",
      deadline: "Prazo no painel: 03/10",
      title: "Dia real de atendimentos (bastidores)",
      details: {
        formato: "Sem falar pra câmera nem decorar roteiro — a narração é montada depois em cima das imagens. Vídeos na vertical, takes curtos, som não é prioridade.",
        foco: null,
        pontos: [
          "Abertura: selfie rápida com tchauzinho OU só imagens trabalhando, sem falar nada",
          "Em cada atendimento: procedimento + resultado, variando ângulos (de cima, de lado, mais aberto)",
          "Reação da cliente ao resultado — se puder virar depoimento, manter o áudio (confirmar autorização antes de publicar)",
          "Bastidores entre clientes: higienizar a maca, organizar materiais, detalhes do estúdio, uma pausa",
          "Fechamento no fim do expediente: organizando o espaço, apagando as luzes ou um tchau pra câmera"
        ]
      },
      ref: true
    },
    {
      id: "2026-10-09-roteiro",
      date: "Sex, 09 de out",
      deadline: "Prazo no painel: 03/10",
      title: "Vídeo em tópicos, estilo orgânico (selfie)",
      details: {
        formato: "Modo selfie, falando em tópicos — bem parecido com a referência.",
        foco: "Tema: “coisas que eu não acho normal sendo especialista em pestanas e sobrancelhas”.",
        pontos: [
          "Achar que toda extensão de pestanas fica artificial",
          "Achar que tirar uns pelinhos da sobrancelha em casa é igual a fazer num studio",
          "Não estar satisfeita com o olhar e achar que não tem o que fazer",
          "Ter medo de brow lamination por causa de uma sobrancelha arrepiada que viu na internet",
          "Fazer as pestanas e esquecer da manutenção",
          "Não se cuidar por “falta de tempo”"
        ]
      },
      ref: true
    }
  ];

  var APPROVED = [
    {date:"Sáb, 03 de out", type:"COPY"},
    {date:"Sáb, 03 de out · 18h00", type:"COPY"},
    {date:"Qui, 08 de out · 14h00", type:"COPY"},
    {date:"Seg, 12 de out", type:"ROTEIRO"},
    {date:"Ter, 13 de out", type:"ROTEIRO"},
    {date:"Qui, 15 de out", type:"COPY"},
    {date:"Sex, 16 de out", type:"ROTEIRO"},
    {date:"Seg, 19 de out", type:"COPY"},
    {date:"Ter, 20 de out", type:"ROTEIRO"},
    {date:"Qui, 22 de out", type:"ROTEIRO"},
    {date:"Sex, 23 de out", type:"ROTEIRO"},
    {date:"Seg, 26 de out", type:"COPY"},
    {date:"Ter, 27 de out", type:"ROTEIRO"},
    {date:"Qui, 29 de out", type:"ROTEIRO"},
    {date:"Sex, 30 de out", type:"COPY"}
  ];

  function loadDelivered(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveDelivered(list){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }

  var delivered = loadDelivered();
  var openIds = {};

  function checkSvg(){
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function esc(s){
    return String(s).replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; });
  }

  function renderDetails(d, ref){
    var html = '';
    if (d.formato) html += '<h4>Formato</h4><p>' + esc(d.formato) + '</p>';
    if (d.foco) html += '<h4>Foco</h4><p>' + esc(d.foco) + '</p>';
    if (d.pontos && d.pontos.length){
      html += '<h4>Roteiro</h4><ul>';
      d.pontos.forEach(function(p){ html += '<li>' + esc(p) + '</li>'; });
      html += '</ul>';
    }
    if (ref){
      html += '<a class="ref-link" href="https://aprovapost.com.br/13527/cliente/nicole-kentta/" target="_blank" rel="noopener">Ver referência no painel →</a>';
    }
    return html;
  }

  function renderPending(){
    var list = document.getElementById('pending-list');
    list.innerHTML = '';
    ITEMS.forEach(function(item){
      var done = delivered.indexOf(item.id) !== -1;
      var open = !!openIds[item.id];
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
          '<div class="card-top"><span class="date">' + esc(item.date) + '</span><span class="tag">Roteiro</span><span class="deadline">' + esc(item.deadline) + '</span></div>' +
          '<div class="title">' + esc(item.title) + '</div>' +
          '<div class="status-line' + (done ? ' done' : '') + '">' + (done ? 'Material entregue' : 'Aguardando gravação') + '</div>' +
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
        toggleDelivered(item.id);
      });

      var details = document.createElement('div');
      details.className = 'details';
      details.innerHTML = renderDetails(item.details, item.ref);

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
      var isCopy = a.type === 'COPY';
      row.innerHTML =
        '<div class="copy-row">' +
          '<div class="dot">' + (isCopy ? '·' : '<span class="check-mini">' + checkSvg() + '</span>') + '</div>' +
          '<div class="card-main">' +
            '<div class="card-top"><span class="date">' + esc(a.date) + '</span><span class="tag ' + (isCopy ? 'copy' : '') + '">' + a.type + '</span></div>' +
            '<div class="title muted">' + (isCopy ? 'Copy definida pela agência' : 'Aprovado pela agência') + '</div>' +
          '</div>' +
        '</div>';
      list.appendChild(row);
    });
  }

  function updateProgress(){
    var total = ITEMS.length;
    var done = delivered.length;
    document.getElementById('progress-num').textContent = done + '/' + total;
    document.getElementById('pending-count').textContent = (total - done);
    document.getElementById('progress-bar').style.width = (total ? (done / total * 100) : 0) + '%';
  }

  function renderAll(){
    renderPending();
    renderApproved();
    updateProgress();
  }

  function toggleDelivered(id){
    var idx = delivered.indexOf(id);
    if (idx === -1) delivered.push(id); else delivered.splice(idx, 1);
    saveDelivered(delivered);
    renderAll();
  }

  renderAll();
})();
