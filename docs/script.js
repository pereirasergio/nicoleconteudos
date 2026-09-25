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

  // Itens já "Aprovado" pela agência. kind define a tag/cor:
  //   "video" = Roteiro de Vídeo (Nicole grava vídeo)
  //   "foto"  = Roteiro de Imagem OU Copy que pede fotos/prints da Nicole
  //   "copy"  = legenda/carrossel pronto, sem material a produzir
  // prazo só aparece quando o painel mostra um "Prazo:" explícito.
  var APPROVED = [
    {
      id: "2026-10-03-stories",
      date: "Sáb, 03 de out",
      kind: "copy",
      title: "Stories Semana 1 (05 a 11 de out)",
      body: '<h4>Sobre</h4><p>Roteiro de stories da semana — um tema por dia, para Nicole gravar e postar (sem prazo de entrega, é conteúdo do dia a dia).</p>' +
        '<h4>Segunda | conexão</h4><p><strong>Foco:</strong> começar uma conversa com quem acompanha.<br><strong>Sequência sugerida:</strong> Nicole aparece, mostra um pedacinho da rotina e pergunta: “O que você mais gosta no seu olhar: pestanas ou sobrancelhas?” Pode usar enquete para puxar as respostas.</p>' +
        '<h4>Terça | educação</h4><p><strong>Foco:</strong> ajudar a cliente a entender os serviços.<br><strong>Sequência sugerida:</strong> Escolher uma dúvida por vez. Ex.: “Extensão de pestanas precisa ficar marcada?” Mostrar dois resultados diferentes e explicar, em poucas palavras, como a escolha do efeito muda o visual.</p>' +
        '<h4>Quarta | carreira e autoridade</h4><p><strong>Foco:</strong> mostrar a profissional por trás dos atendimentos.<br><strong>Sequência sugerida:</strong> Contar uma história curta da trajetória em Portugal, mostrar algo que aprendeu na profissão ou explicar uma escolha técnica que faz no atendimento. Cabe falar também com futuras alunas, sem anunciar cursos antes da hora.</p>' +
        '<h4>Quinta | quebra de objeção</h4><p><strong>Foco:</strong> dar segurança para quem quer marcar.<br><strong>Sequência sugerida:</strong> Pegar um receio real: medo de ficar artificial, dúvidas sobre manutenção ou sobre como escolher o procedimento. Nicole responde olhando para a câmera e mostra um exemplo do próprio trabalho.</p>' +
        '<h4>Sexta | dia de atendimentos</h4><p><strong>Foco:</strong> mostrar a experiência acontecendo.<br><strong>Sequência sugerida:</strong> Chegada ao estúdio, preparação, trechos de um procedimento, resultado final e, quando houver autorização, reação ou comentário da cliente. Vale gravar ao longo do dia e publicar só os melhores momentos.</p>' +
        '<h4>Sábado | resultados e convite</h4><p><strong>Foco:</strong> transformar interesse em marcação.<br><strong>Sequência sugerida:</strong> Mostrar um resultado de pestanas ou sobrancelhas, contar brevemente o que a cliente procurava e fechar com: “Quer encontrar um resultado que combine com você? Me chama no WhatsApp.”</p>' +
        '<h4>Domingo | proximidade e agenda</h4><p><strong>Foco:</strong> manter a presença de forma leve.<br><strong>Sequência sugerida:</strong> Um momento da vida real, uma reflexão curta sobre a semana ou os preparativos para a próxima. Se fizer sentido, terminar com os horários disponíveis. Se for dia de descanso, bastam um ou dois stories.</p>'
    },
    {
      id: "2026-10-03-1800-copy",
      date: "Sáb, 03 de out",
      hora: "18h00",
      kind: "copy",
      title: "Carrossel de apresentação — “Prazer, Nicole Kenttä”",
      body: '<h4>Legenda</h4><p>Prazer, Nicole Kenttä.<br>A beleza entrou na minha vida ainda na adolescência. Hoje, poder cuidar de cada cliente aqui em Braga é uma parte muito especial da minha história. 🤎</p><p>Se você chegou agora, seja bem-vinda! Me conta: conheceu o meu trabalho pelas sobrancelhas ou pelas pestanas?</p>'
    },
    {
      id: "2026-10-08-foto",
      date: "Qui, 08 de out",
      hora: "14h00",
      kind: "foto",
      title: "Foto de resultado — sobrancelhas/pestanas",
      body: '<h4>O que enviar</h4><p>Enviar material de Sobrancelhas ou pestanas, ou os dois juntos.</p>'
    },
    {
      id: "2026-10-12-video",
      date: "Seg, 12 de out",
      kind: "video",
      prazo: "07/10",
      title: "Vídeo “spoiler” — bastidores e apostila",
      body: '<h4>Orientações</h4><p><strong>Vídeo:</strong> Cenas suas trabalhando, viajando, até montando apostila para ser um "spoiler".<br><strong>Texto na tela:</strong> Imagina olhar daqui 6 meses e ver que você teve coragem de começar algo novo e que deu certo.</p>',
      ref: "https://www.instagram.com/reel/DcmSy8KMzvl/?stkn=MTkxZjV3ZXBtZmNiNQ=="
    },
    {
      id: "2026-10-13-fotos",
      date: "Ter, 13 de out",
      kind: "foto",
      prazo: "07/10",
      title: "Fotos do studio, do resultado e da artista",
      body: '<h4>Orientações</h4><ul><li>O lugar: foto de um ambiente do studio</li><li>A arte: foto de um resultado</li><li>A artista: uma foto sua</li></ul>',
      ref: "https://aprovapost.com.br/uploads/roteiros/5394/6ab51ef4dd804_Captura%20de%20Tela%202026-09-24%20a%CC%80s%2010.00.00.png"
    },
    {
      id: "2026-10-15-foto",
      date: "Qui, 15 de out",
      kind: "foto",
      title: "Foto de resultado — sobrancelhas/pestanas",
      body: '<h4>O que enviar</h4><p>Enviar material de Sobrancelhas ou pestanas.</p>'
    },
    {
      id: "2026-10-16-video",
      date: "Sex, 16 de out",
      kind: "video",
      prazo: "09/10",
      title: "Vídeo perguntas e respostas — mitos da carreira",
      body: '<h4>Formato</h4><p>Alguém atrás da câmera faz as perguntas (ou você narra as perguntas depois, mas lembre-se de deixar esse tempo gravando você também); Nicole responde olhando para a câmera.</p>' +
        '<h4>Roteiro</h4>' +
        '<p><strong>1. Gancho</strong><br>Pessoa atrás da câmera: “O mercado da beleza está saturado?”<br>Nicole: “Mito. É um mercado concorrido, sim, mas que cresce constantemente. Por isso, aprender a técnica, praticar e cuidar bem de cada cliente faz diferença. Entrar na área é só o começo.”</p>' +
        '<p><strong>2. Início da carreira</strong><br>Pessoa atrás da câmera: “Preciso saber fazer todas as técnicas de pestanas antes de começar?”<br>Nicole: “Mito. Você precisa aprender bem os fundamentos da técnica com que vai trabalhar, praticar e entender o que está a fazer. Não precisa tentar aprender tudo de uma vez.”</p>' +
        '<p><strong>3. Personalização</strong><br>Pessoa atrás da câmera: “O mesmo efeito de pestanas fica bom em todas as clientes?”<br>Nicole: “Mito! Uma cliente quer algo discreto, outra gosta de mais destaque. Parte do nosso trabalho é ouvir o que ela procura e saber fazer escolhas para aquele atendimento.”</p>' +
        '<p><strong>4. Fecho</strong><br>Pessoa atrás da câmera: “Então dá para começar na área mesmo sem saber tudo?”<br>Nicole: “Verdade. Ninguém começa sabendo tudo. O importante é levar o aprendizado e a prática a sério.”</p>' +
        '<p><strong>CTA</strong> (Nicole olha diretamente para a câmera): “Se você gosta do mundo da beleza e quer aprender mais sobre pestanas e sobrancelhas, me segue aqui.”</p>'
    },
    {
      id: "2026-10-19-feedbacks",
      date: "Seg, 19 de out",
      kind: "foto",
      title: "Carrossel de feedbacks das clientes",
      body: '<h4>Legenda</h4><p>Feedbacks: Não sou eu quem estou dizendo, são elas →<br>Arrasta para o lado para conferir feedbacks de quem confia! ✨</p><p>Se você é de Braga e também quer cuidar das suas sobrancelhas ou pestanas, clica no link da bio e faça a tua marcação.</p>' +
        '<h4>Fotos necessárias</h4><ul><li>Foto de procedimento de fundo</li><li>Print de feedbacks das clientes (envie pelo menos 5, por favor)</li></ul>'
    },
    {
      id: "2026-10-20-video",
      date: "Ter, 20 de out",
      kind: "video",
      prazo: "15/10",
      title: "Vídeo “A beleza vem de dentro”",
      body: '<h4>Orientações</h4><p><strong>Gancho:</strong> Nicole “chamando” com a mão, entrando no seu ambiente de trabalho.<br><strong>Texto na tela:</strong> A beleza vem de dentro.</p><p><strong>Gravar takes</strong> (texto na tela: “Daqui de dentro”):</p><ul><li>Processo dos procedimentos de sobrancelhas e pestanas</li><li>Detalhes do cuidado do espaço</li><li>Resultados em vídeo</li><li>Reação das clientes</li></ul>',
      ref: "https://www.instagram.com/reel/DWGx4hRDTKN/?stkn=MWF0bXYzOXQwZXZpNQ=="
    },
    {
      id: "2026-10-22-video",
      date: "Qui, 22 de out",
      kind: "video",
      prazo: "16/10",
      title: "Vídeo — mitos sobre extensão de pestanas",
      body: '<h4>Orientações</h4>' +
        '<p><strong>Gancho:</strong> Tudo o que você precisa saber antes de fazer extensão de pestanas.</p>' +
        '<p><strong>Cena 2</strong> — Nicole para a câmera: Suas pestanas não precisam ficar artificiais. Existem efeitos mais discretos e outros mais marcados. A gente conversa sobre o que você gosta antes de escolher. → Mostrar dois resultados reais com efeitos diferentes.</p>' +
        '<p><strong>Cena 3</strong> — A alergia é um risco, sim. Nenhuma profissional pode prometer risco zero. Se você já teve alguma reação, é importante me comunicar antes de marcar.</p>' +
        '<p><strong>Cena 4</strong> — A ideia da extensão não é prejudicar as suas pestanas naturais. Mas uma aplicação inadequada pode afetar os fios. Por isso, eu avalio as suas pestanas, faço a aplicação com cuidado e explico como cuidar delas depois. → Mostrar avaliação e takes próximos da aplicação.</p>' +
        '<p><strong>Cena 5</strong> — O tempo de durabilidade varia de pessoa para pessoa. E, se você quiser manter o efeito, os cuidados diários e a manutenção precisam fazer parte da sua rotina.</p>' +
        '<p><strong>Fecho:</strong> Se você é de Braga, me chama no WhatsApp, vamos encontrar o efeito de pestanas que mais combina com você.</p>'
    },
    {
      id: "2026-10-23-video",
      date: "Sex, 23 de out",
      kind: "video",
      prazo: "19/10",
      title: "Vídeo — bastidores do curso de pestanas/sobrancelhas",
      body: '<h4>Orientações</h4><p><strong>Vídeo:</strong> Nicole fazendo um procedimento, vivendo, resultados.<br><strong>Texto na tela:</strong> “Um dia eu fiz um curso de pestanas e sobrancelhas e isso meio que paga minhas contas até hoje”.</p>',
      ref: "https://www.instagram.com/reel/DccQauVRLla/?stkn=MTM2cm1mZDVtMG5xdg=="
    },
    {
      id: "2026-10-26-carrossel",
      date: "Seg, 26 de out",
      kind: "foto",
      title: "Carrossel — “O que te incomoda no seu olhar tem solução”",
      body: '<h4>Legenda</h4><p>O que te incomoda no seu olhar tem solução<br>Descubra qual destes cuidados combina com o que você procura.</p><p>Às vezes você sabe o que gostaria de mudar no seu olhar, mas não sabe qual procedimento escolher. E tudo bem! 🤎</p><p>Se você é de Braga, me chama no WhatsApp e conta o que procura. Vamos conversar sobre o cuidado que faz sentido para você. ✨</p>' +
        '<h4>Fotos necessárias (uma por slide)</h4><ul>' +
        '<li>Extensão de pestanas — resultado real, mostrando bem o efeito escolhido pela cliente</li>' +
        '<li>Brow lamination — resultado real em que a posição dos fios esteja visível</li>' +
        '<li>Design de sobrancelhas — antes e depois autorizado, ou foto do resultado final</li>' +
        '<li>Lash lifting — close do resultado, de preferência com antes e depois autorizado</li>' +
        '</ul>'
    },
    {
      id: "2026-10-27-fotos",
      date: "Ter, 27 de out",
      kind: "foto",
      prazo: "23/10",
      title: "Fotos antes / processo / resultado",
      body: '<h4>Fotos necessárias</h4><ul><li>Antes</li><li>Processo</li><li>Resultado</li></ul><p><strong>Dica:</strong> lembre-se de tirar a foto no ângulo mais parecido possível um do outro para ficar igual ao da referência.</p>',
      ref: "https://aprovapost.com.br/uploads/roteiros/5401/6ab5236bce8bd_Captura%20de%20Tela%202026-09-24%20a%CC%80s%2010.18.33.png"
    },
    {
      id: "2026-10-29-video",
      date: "Qui, 29 de out",
      kind: "video",
      prazo: "26/10",
      title: "Vídeo — transição antes e depois",
      body: '<h4>Orientações</h4><p>Podemos seguir a ideia do vídeo de referência, ou escolher um outro vídeo de transição. A ideia é mostrar de forma rápida o antes e depois de uma modelo que fez pestanas e sobrancelhas.</p>',
      ref: "https://www.instagram.com/reel/DavmIujRxkh/?stkn=NG9jZXRpamNkam41"
    },
    {
      id: "2026-10-30-carrossel",
      date: "Sex, 30 de out",
      kind: "foto",
      title: "Carrossel — “Quero ser sua profissional preferida”",
      body: '<h4>Legenda</h4><p>Quero ser sua profissional preferida de sobrancelhas e pestanas.<br>Então...</p><p>Minha missão é valorizar o seu olhar e te deixar ainda mais linda!</p><p>Se você é de Braga, me chama no WhatsApp pelo link da bio. Vou adorar cuidar de você! ✨</p>' +
        '<h4>Fotos necessárias (uma por slide)</h4><ul>' +
        '<li>Nicole atendendo</li>' +
        '<li>Resultado real do processo / desenho do design</li>' +
        '<li>Aplicação ou resultado de extensão de pestanas</li>' +
        '<li>Detalhes do espaço ou da Nicole a atender</li>' +
        '</ul>'
    }
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

  var TAG_LABEL = { video: 'Vídeo', foto: 'Fotos', copy: 'Copy' };
  var TAG_CLASS = { video: '', foto: 'foto', copy: 'copy' };

  function renderApprovedDetails(item){
    var html = item.body || '';
    if (item.ref){
      html += '<a class="ref-link" href="' + esc(item.ref) + '" target="_blank" rel="noopener">Ver referência →</a>';
    }
    return html;
  }

  function renderApproved(){
    var list = document.getElementById('approved-list');
    list.innerHTML = '';
    APPROVED.forEach(function(item){
      var open = !!openIds[item.id];

      var card = document.createElement('div');
      card.className = 'card';
      card.dataset.open = open ? 'true' : 'false';

      var row = document.createElement('div');
      row.className = 'card-row';
      row.tabIndex = 0;
      row.setAttribute('role', 'button');

      var dateLine = esc(item.date) + (item.hora ? ' · ' + esc(item.hora) : '');
      var topHtml = '<div class="card-top">';
      if (item.prazo) topHtml += '<span class="deadline-badge">Prazo: ' + esc(item.prazo) + '</span>';
      topHtml += '<span class="tag ' + TAG_CLASS[item.kind] + '">' + TAG_LABEL[item.kind] + '</span>';
      topHtml += '</div>';

      row.innerHTML =
        '<div class="check-mini" data-role="status">' + checkSvg() + '</div>' +
        '<div class="card-main">' +
          topHtml +
          '<div class="title">' + esc(item.title) + '</div>' +
          '<div class="launch-date">Vai ao ar: ' + dateLine + '</div>' +
          '<div class="status-line done">Aprovado pela agência</div>' +
        '</div>' +
        '<div class="chevron">▾</div>';

      row.addEventListener('click', function(){
        openIds[item.id] = !openIds[item.id];
        renderApproved();
      });

      var details = document.createElement('div');
      details.className = 'details';
      details.innerHTML = renderApprovedDetails(item);

      card.appendChild(row);
      card.appendChild(details);
      list.appendChild(card);
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
