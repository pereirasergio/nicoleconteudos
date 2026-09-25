(function(){
  var STORAGE_KEY = 'nicole-entregas-v2';

  // Todos os itens do painel (nada foi de fato ENTREGUE pela Nicole ainda —
  // "Aprovado" no painel da AprovaPost quer dizer que a agência aprovou o
  // roteiro/legenda, não que o material já foi produzido). Por isso tudo
  // mora numa lista só, "Para produzir", com checkbox.
  //
  // kind define a tag/cor do item:
  //   "video" = Roteiro de Vídeo (Nicole grava vídeo)
  //   "foto"  = Roteiro de Imagem OU Copy que pede fotos/prints da Nicole
  //   "copy"  = legenda/carrossel pronto, sem material a produzir
  //
  // subitems são os checkboxes individuais (cenas, fotos, dias de stories...).
  // Um item com um único entregável usa um subitem sintético "_single" —
  // mesma lógica de "master = todos os subitems marcados" para todos os itens.
  //
  // prazo só aparece quando o painel mostra um "Prazo:" explícito.
  var ITEMS = [
    {
      id: "2026-10-05-roteiro",
      date: "Seg, 05 de out",
      kind: "video",
      prazo: "03/10",
      title: "Extensão de pestanas, sobrancelhas e brow lamination",
      body: '<h4>Formato</h4><p>Nicole começa falando para a câmera. Depois entram takes dos procedimentos e dos resultados, com a fala dela em off.</p><h4>Foco</h4><p>Extensão de pestanas, design de sobrancelhas e brow lamination.</p>',
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
      kind: "video",
      prazo: "03/10",
      title: "Dia real de atendimentos (bastidores)",
      body: '<h4>Formato</h4><p>Sem falar pra câmera nem decorar roteiro — a narração é montada depois em cima das imagens. Vídeos na vertical, takes curtos, som não é prioridade.</p>',
      subitems: [
        { id: "s1", text: "Abertura: selfie rápida com tchauzinho OU só imagens trabalhando, sem falar nada" },
        { id: "s2", text: "Em cada atendimento: procedimento + resultado, variando ângulos (de cima, de lado, mais aberto)" },
        { id: "s3", text: "Reação da cliente ao resultado — se puder virar depoimento, manter o áudio (confirmar autorização antes de publicar)" },
        { id: "s4", text: "Bastidores entre clientes: higienizar a maca, organizar materiais, detalhes do estúdio, uma pausa" },
        { id: "s5", text: "Fechamento no fim do expediente: organizando o espaço, apagando as luzes ou um tchau pra câmera" }
      ],
      ref: "https://www.instagram.com/reel/DZvYAFxNtyo/?stkn=eHRkcjU4Nzg5NTN0"
    },
    {
      id: "2026-10-09-roteiro",
      date: "Sex, 09 de out",
      kind: "video",
      prazo: "03/10",
      title: "Vídeo em tópicos, estilo orgânico (selfie)",
      body: '<h4>Formato</h4><p>Modo selfie, falando em tópicos — bem parecido com a referência. Vídeo único e contínuo (não precisa gravar em partes separadas).</p><h4>Foco</h4><p>Tema: “coisas que eu não acho normal sendo especialista em pestanas e sobrancelhas”.</p>' +
        '<h4>Roteiro</h4><ul>' +
        '<li>Achar que toda extensão de pestanas fica artificial</li>' +
        '<li>Achar que tirar uns pelinhos da sobrancelha em casa é igual a fazer num studio</li>' +
        '<li>Não estar satisfeita com o olhar e achar que não tem o que fazer</li>' +
        '<li>Ter medo de brow lamination por causa de uma sobrancelha arrepiada que viu na internet</li>' +
        '<li>Fazer as pestanas e esquecer da manutenção</li>' +
        '<li>Não se cuidar por “falta de tempo”</li>' +
        '</ul>',
      ref: "https://www.instagram.com/reel/DcPP2u8P0VL/?stkn=dmM0eHVtdzFhaXZw"
    },
    {
      id: "2026-10-03-0000-stories",
      date: "Sáb, 03 de out",
      kind: "copy",
      title: "Stories Semana 1 (05 a 11 de out)",
      body: '<h4>Sobre</h4><p>Roteiro de stories da semana — um tema por dia (sem prazo de entrega, é conteúdo do dia a dia). O detalhe de cada dia está nos checkboxes abaixo.</p>',
      subitems: [
        { id: "s1", text: "Segunda | conexão — Foco: começar uma conversa com quem acompanha. Sequência: Nicole aparece, mostra um pedacinho da rotina e pergunta “O que você mais gosta no seu olhar: pestanas ou sobrancelhas?” (pode usar enquete)." },
        { id: "s2", text: "Terça | educação — Foco: ajudar a cliente a entender os serviços. Sequência: escolher uma dúvida por vez (ex.: “Extensão de pestanas precisa ficar marcada?”), mostrar dois resultados diferentes." },
        { id: "s3", text: "Quarta | carreira e autoridade — Foco: mostrar a profissional por trás dos atendimentos. Sequência: contar uma história curta da trajetória em Portugal ou uma escolha técnica do atendimento." },
        { id: "s4", text: "Quinta | quebra de objeção — Foco: dar segurança para quem quer marcar. Sequência: pegar um receio real (medo de ficar artificial, manutenção etc.) e responder com um exemplo do próprio trabalho." },
        { id: "s5", text: "Sexta | dia de atendimentos — Foco: mostrar a experiência acontecendo. Sequência: chegada ao estúdio, preparação, trechos de um procedimento, resultado final, reação da cliente (se autorizado)." },
        { id: "s6", text: "Sábado | resultados e convite — Foco: transformar interesse em marcação. Sequência: mostrar um resultado, contar o que a cliente procurava e fechar com CTA para o WhatsApp." },
        { id: "s7", text: "Domingo | proximidade e agenda — Foco: manter a presença de forma leve. Sequência: um momento da vida real, reflexão da semana ou horários disponíveis (1 ou 2 stories bastam)." }
      ]
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
      body: '<h4>Orientações</h4><p>Três fotos, marcadas separadamente abaixo.</p>',
      subitems: [
        { id: "s1", text: "O lugar — foto de um ambiente do studio" },
        { id: "s2", text: "A arte — foto de um resultado" },
        { id: "s3", text: "A artista — uma foto sua" }
      ],
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
      body: '<h4>Legenda</h4><p>Feedbacks: Não sou eu quem estou dizendo, são elas →<br>Arrasta para o lado para conferir feedbacks de quem confia! ✨</p><p>Se você é de Braga e também quer cuidar das suas sobrancelhas ou pestanas, clica no link da bio e faça a tua marcação.</p>',
      subitems: [
        { id: "s1", text: "Foto de procedimento de fundo" },
        { id: "s2", text: "Prints de feedbacks das clientes (pelo menos 5)" }
      ]
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
        '<p><strong>Fecho:</strong> Se você é de Braga, me chama no WhatsApp, vamos encontrar o efeito de pestanas que mais combina com você.</p>',
      ref: "https://aprovapost.com.br/13527/cliente/nicole-kentta/"
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
      body: '<h4>Legenda</h4><p>O que te incomoda no seu olhar tem solução<br>Descubra qual destes cuidados combina com o que você procura.</p><p>Às vezes você sabe o que gostaria de mudar no seu olhar, mas não sabe qual procedimento escolher. E tudo bem! 🤎</p><p>Se você é de Braga, me chama no WhatsApp e conta o que procura. Vamos conversar sobre o cuidado que faz sentido para você. ✨</p>',
      subitems: [
        { id: "s1", text: "Foto — extensão de pestanas: resultado real, mostrando bem o efeito escolhido pela cliente" },
        { id: "s2", text: "Foto — brow lamination: resultado real em que a posição dos fios esteja visível" },
        { id: "s3", text: "Foto — design de sobrancelhas: antes e depois autorizado, ou foto do resultado final" },
        { id: "s4", text: "Foto — lash lifting: close do resultado, de preferência com antes e depois autorizado" }
      ]
    },
    {
      id: "2026-10-27-fotos",
      date: "Ter, 27 de out",
      kind: "foto",
      prazo: "23/10",
      title: "Fotos antes / processo / resultado",
      body: '<h4>Orientações</h4><p><strong>Dica:</strong> lembre-se de tirar a foto no ângulo mais parecido possível um do outro para ficar igual ao da referência.</p>',
      subitems: [
        { id: "s1", text: "Antes" },
        { id: "s2", text: "Processo" },
        { id: "s3", text: "Resultado" }
      ],
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
      body: '<h4>Legenda</h4><p>Quero ser sua profissional preferida de sobrancelhas e pestanas.<br>Então...</p><p>Minha missão é valorizar o seu olhar e te deixar ainda mais linda!</p><p>Se você é de Braga, me chama no WhatsApp pelo link da bio. Vou adorar cuidar de você! ✨</p>',
      subitems: [
        { id: "s1", text: "Foto — Nicole atendendo" },
        { id: "s2", text: "Foto — resultado real do processo / desenho do design" },
        { id: "s3", text: "Foto — aplicação ou resultado de extensão de pestanas" },
        { id: "s4", text: "Foto — detalhes do espaço ou da Nicole a atender" }
      ]
    }
  ];

  // Ordena por data (todas em 2026-10) para a lista ficar em ordem cronológica.
  ITEMS.sort(function(a, b){ return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });

  // Itens sem "subitems" explícitos ganham um subitem sintético único, para a
  // mesma lógica de done/toggle funcionar em todo item (checkbox único).
  ITEMS.forEach(function(item){
    if (!item.subitems) item.subitems = [{ id: "_single", text: null }];
  });

  var TAG_LABEL = { video: 'Vídeo', foto: 'Fotos', copy: 'Copy' };
  var TAG_CLASS = { video: '', foto: 'foto', copy: 'copy' };
  var UNIT_LABEL = { video: 'vídeos gravados', foto: 'fotos enviadas', copy: 'itens prontos' };
  var DONE_LABEL = { video: 'Material entregue', foto: 'Material entregue', copy: 'Publicado' };
  var WAIT_LABEL = { video: 'Aguardando gravação', foto: 'Aguardando envio', copy: 'Aguardando publicação' };

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
    var html = item.body || '';

    var hasVisibleSubitems = item.subitems.length && item.subitems[0].id !== '_single';
    if (hasVisibleSubitems){
      var heading = item.kind === 'video' ? 'Vídeos a gravar' : (item.kind === 'foto' ? 'Fotos a enviar' : 'Itens');
      html += '<h4>' + heading + '</h4><div class="sublist" data-item="' + esc(item.id) + '">';
      item.subitems.forEach(function(s){
        var done = isSubChecked(item.id, s.id);
        html += '<div class="subitem" data-sub="' + esc(s.id) + '" data-done="' + done + '" role="button" tabindex="0">' +
          '<span class="subcheck">' + checkSvg() + '</span>' +
          '<span class="subitem-text">' + esc(s.text) + '</span>' +
        '</div>';
      });
      html += '</div>';
    }

    if (item.ref){
      html += '<a class="ref-link" href="' + esc(item.ref) + '" target="_blank" rel="noopener">Ver referência →</a>';
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
        statusText = DONE_LABEL[item.kind];
      } else if (hasVisibleSubitems) {
        statusText = checkedCount + '/' + totalCount + ' ' + UNIT_LABEL[item.kind];
      } else {
        statusText = WAIT_LABEL[item.kind];
      }

      var card = document.createElement('div');
      card.className = 'card pending';
      card.dataset.done = done ? 'true' : 'false';
      card.dataset.open = open ? 'true' : 'false';

      var dateLine = esc(item.date) + (item.hora ? ' · ' + esc(item.hora) : '');

      var row = document.createElement('div');
      row.className = 'card-row';
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      row.innerHTML =
        '<div class="check" data-role="check">' + checkSvg() + '</div>' +
        '<div class="card-main">' +
          '<div class="card-top">' +
            (item.prazo ? '<span class="deadline-badge">Prazo: ' + esc(item.prazo) + '</span>' : '') +
            '<span class="tag ' + TAG_CLASS[item.kind] + '">' + TAG_LABEL[item.kind] + '</span>' +
          '</div>' +
          '<div class="title">' + esc(item.title) + '</div>' +
          '<div class="launch-date">Vai ao ar: ' + dateLine + '</div>' +
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

  function updatePendingCount(){
    var remaining = ITEMS.filter(function(item){ return !isItemDone(item); }).length;
    document.getElementById('pending-count').textContent = remaining;
  }

  function renderAll(){
    renderPending();
    updatePendingCount();
  }

  renderAll();
})();
