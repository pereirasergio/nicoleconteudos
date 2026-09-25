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
      body: '<h4>Formato</h4><p>Nicole começa falando para a câmera. Depois, entram takes dos procedimentos e dos resultados, com a fala dela em off.</p>' +
        '<h4>Foco</h4><p>Extensão de pestanas, design de sobrancelhas e brow lamination.</p>' +
        '<h4>Cena 1 — Nicole olhando para a câmera | Gancho</h4><p>Sabe quando você se olha no espelho, arruma as sobrancelhas, passa máscara nas pestanas… e ainda sente que falta alguma coisa no seu olhar?</p><p><strong>Texto na tela:</strong> “Sente que falta alguma coisa no seu olhar?”</p>' +
        '<h4>Cena 2 — Nicole ainda na câmera</h4><p>Pois é, eu também já passei por isso. E às vezes, tudo o que queria era não precisar passar tanto tempo me arrumando todos os dias, sabe?</p>' +
        '<h4>Cena 3 — Entram takes de Nicole fazendo extensão de pestanas</h4><p>Foi aí que descobri a extensão de pestanas e a brow lamination.</p><p>Se você quer dar mais destaque ao seu olhar e deixar a rotina mais prática, a extensão de pestanas pode ser o resultado que está procurando.</p><p>Mostrar aplicação e, em seguida, um resultado real.</p>' +
        '<h4>Cena 4 — Takes de design de sobrancelhas e brow lamination</h4><p>Nas sobrancelhas, o design por si só, já ajuda a valorizar o formato. Mas, se você gosta dos fios mais alinhados, e aquela sensação de sobrancelha mais preenchida, você vai se apaixonar pela brow lamination.</p>' +
        '<h4>Cena 5 — Montagem com os resultados e Nicole volta à câmera</h4><p>E é incrível como cuidar desses detalhes pode mudar a forma como você se vê no espelho. Se você é de Braga, me chama no WhatsApp, quero te ajudar a escolher o que mais combina com o seu olhar.</p>',
      subitems: [
        { id: "s1", text: "Cena 1 — Nicole olhando para a câmera | Gancho" },
        { id: "s2", text: "Cena 2 — Nicole ainda na câmera" },
        { id: "s3", text: "Cena 3 — takes de Nicole fazendo extensão de pestanas" },
        { id: "s4", text: "Cena 4 — takes de design de sobrancelhas e brow lamination" },
        { id: "s5", text: "Cena 5 — montagem com os resultados e Nicole volta à câmera" }
      ]
    },
    {
      id: "2026-10-07-roteiro",
      date: "Qua, 07 de out",
      kind: "video",
      prazo: "03/10",
      title: "Dia real de atendimentos (bastidores)",
      body: '<h4>Orientações</h4><p>A ideia é acompanhar um dia real de atendimentos. Não precisa falar para a câmera nem decorar um roteiro: depois que tivermos as imagens, vamos montar a narração com base no que aconteceu nesse dia.</p><p>Grave os vídeos na vertical, em takes curtos. Não se preocupe com o som, porque a maior parte do Reels será narrada.</p>' +
        '<h4>1. Abertura do vídeo</h4><p>Para termos opções de gancho, grave alguns takes seus em diferentes atendimentos. Você pode escolher o que for mais confortável:</p><ul>' +
        '<li>Fazer uma selfie rápida, olhando para a câmera e dando um tchauzinho ou chamando a pessoa para acompanhar o dia; ou</li>' +
        '<li>Gravar apenas imagens suas trabalhando, sem falar nada.</li>' +
        '</ul>' +
        '<h4>2. Em cada atendimento</h4><p>Se possível, registre um pouco de todos os atendimentos do dia, principalmente o procedimento e o resultado. Não precisa repetir a chegada de todas as clientes.</p><p>Algumas cenas que podem ser gravadas:</p><ul>' +
        '<li>Você cumprimentando uma cliente — uma vez no dia já basta.</li>' +
        '<li>A cliente deitando na maca.</li>' +
        '<li>Você separarando materiais e a preparar o espaço.</li>' +
        '<li>Detalhes das suas mãos durante o procedimento.</li>' +
        '<li>Um ângulo de cima, outro de lado e um um pouco mais aberto, em que você também apareça trabalhando</li>' +
        '<li>O resultado final, com closes das sobrancelhas ou pestanas.</li>' +
        '</ul><p>Tente variar os ângulos quando for possível, sem interromper o atendimento ou dificultar o seu trabalho. Essa variedade vai deixar o vídeo mais dinâmico.</p>' +
        '<h4>3. Resultado e reação da cliente</h4><p>Ao terminar, grave o resultado de cada procedimento. Se a cliente for olhar-se no espelho, tente captar esse momento e a reação espontânea dela.</p><p>Se ela disser algo que possa virar um depoimento, mantenha o áudio original dessa gravação. Antes de usar a imagem ou a fala no Instagram, confirme com ela se autoriza a publicação. O mesmo vale para qualquer take em que a cliente possa ser identificada.</p>' +
        '<h4>4. O que acontece entre uma cliente e outra</h4><p>Os pequenos momentos também fazem parte do vídeo. Se acontecerem naturalmente, grave.</p><ul>' +
        '<li>A higienização da maca e a organização dos materiais para a próxima cliente.</li>' +
        '<li>Detalhes do estúdio.</li>' +
        '<li>Uma pausa para comer ou tomar alguma coisa.</li>' +
        '</ul>' +
        '<h4>5. Fechamento</h4><p>Se lembrar, grave um take rápido no fim do expediente: você organizando o espaço, apagar as luzes ou dar um tchau para a câmera.</p><p>Com os vídeos em mãos, montaremos o roteiro e a narração de acordo com os atendimentos e os momentos que realmente aconteceram.</p>',
      subitems: [
        { id: "s1", text: "1. Abertura do vídeo — takes de gancho (selfie/tchauzinho ou só trabalhando)" },
        { id: "s2", text: "2. Em cada atendimento — procedimento e resultado, ângulos variados" },
        { id: "s3", text: "3. Resultado e reação da cliente (confirmar autorização antes de publicar)" },
        { id: "s4", text: "4. O que acontece entre uma cliente e outra — bastidores" },
        { id: "s5", text: "5. Fechamento no fim do expediente" }
      ],
      ref: "https://www.instagram.com/reel/DZvYAFxNtyo/?stkn=eHRkcjU4Nzg5NTN0"
    },
    {
      id: "2026-10-09-roteiro",
      date: "Sex, 09 de out",
      kind: "video",
      prazo: "03/10",
      title: "Vídeo em tópicos, estilo orgânico (selfie)",
      body: '<h4>Orientações</h4><p>A ideia desse vídeo é ser mais orgânico, então pode até gravar no modo selfie, falando em tópicos, bem parecido com a referência.</p>' +
        '<p>Coisas que eu não acho normal sendo uma especialista em pestanas e sobrancelhas</p><ul>' +
        '<li>Achar que toda extensão de pestanas fica artificial</li>' +
        '<li>Achar que tirar uns pelinhos da sobrancelha em casa vai ser a mesma coisa que fazer num studio especializado</li>' +
        '<li>Não estar satisfeita com o seu olhar e achar que não tem o que fazer</li>' +
        '<li>Ter medo de brow lamination só porque viu uma sobrancelha arrepiada na internet</li>' +
        '<li>Fazer as pestanas e esquecer completamente da manutenção.</li>' +
        '<li>Não se cuidar por "falta de tempo"</li>' +
        '</ul>',
      subitems: [
        { id: "s1", text: "Achar que toda extensão de pestanas fica artificial" },
        { id: "s2", text: "Achar que tirar uns pelinhos da sobrancelha em casa vai ser a mesma coisa que fazer num studio especializado" },
        { id: "s3", text: "Não estar satisfeita com o seu olhar e achar que não tem o que fazer" },
        { id: "s4", text: "Ter medo de brow lamination só porque viu uma sobrancelha arrepiada na internet" },
        { id: "s5", text: "Fazer as pestanas e esquecer completamente da manutenção" },
        { id: "s6", text: "Não se cuidar por \"falta de tempo\"" }
      ],
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
      body: '<h4>Slide 1</h4><p>Prazer, Nicole Kenttä.</p>' +
        '<h4>Slide 2</h4><p>Meu interesse pela beleza começou quando eu ainda era adolescente.</p><p>Eu adorava ver vídeos de maquilhagem, e minha mãe até me deu os meus primeiros cursos de sobrancelhas. Mas, naquela época, os estudos acabaram por levar a minha atenção para outro caminho.</p>' +
        '<h4>Slide 3</h4><p>Depois que me mudei para Portugal, comecei a trabalhar numa empresa de sobrancelhas. E sabe aquele sonho que tinha ficado lá atrás? Voltou com tudo.</p><p>Foi aí que decidi estudar mais, ganhar experiência e, algum tempo depois, começar a trabalhar por conta própria.</p>' +
        '<h4>Slide 4</h4><p>Hoje, uma das partes de que mais gosto no meu trabalho é conhecer quem está à minha frente.</p><p>Quero saber do que você gosta, do que tem receio e de como gostaria de se ver. Porque um resultado bonito também precisa fazer sentido para você.</p>' +
        '<h4>Slide 5</h4><p>Por aqui, cuido principalmente de sobrancelhas e pestanas.</p><p>Seja para dar mais atenção ao desenho das sobrancelhas ou para encontrar um efeito de pestanas que combine com você, meu cuidado está nos detalhes de cada atendimento.</p>' +
        '<h4>Slide 6</h4><p>Também trabalho com henna e tintura, brow lamination, lash lifting, micropigmentação, hidragloss e epilação facial com linha.</p><p>Se você não sabe qual procedimento escolher, pode me contar o que procura. Eu ajudo a entender as opções.</p>' +
        '<h4>Slide 7</h4><p>Agora que já contei um pouco sobre mim, quero conhecer você também!</p><p>Se você é de Braga e região, me chama no WhatsApp. Vamos conversar e encontrar um atendimento que combine com você.</p>' +
        '<h4>Legenda (texto do post)</h4><p>Prazer, Nicole Kenttä.<br>A beleza entrou na minha vida ainda na adolescência. Hoje, poder cuidar de cada cliente aqui em Braga é uma parte muito especial da minha história. 🤎</p><p>Se você chegou agora, seja bem-vinda! Me conta: conheceu o meu trabalho pelas sobrancelhas ou pelas pestanas?</p>'
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
      body: '<h4>Slide 1</h4><p>Feedbacks: Não sou eu quem estou dizendo, são elas →</p>' +
        '<h4>Slide 2 (fotos a enviar)</h4><p>Foto de procedimento de fundo</p><p>Print de feebacks das clientes (envie pelo menos 5 por favor)</p>' +
        '<h4>Slide 3</h4><p>Se elas confiam, você também pode confiar.</p><p>Clica no link da bio e faça sua marcação!</p>' +
        '<h4>Legenda (texto do post)</h4><p>Arrasta para o lado para conferir feedbacks de quem confia! ✨</p><p>Se você é de Braga e também quer cuidar das suas sobrancelhas ou pestanas, clica no link da bio e faça a tua marcação.</p>',
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
      body: '<h4>Slide 1</h4><p>O que te incomoda no seu olhar tem solução</p><p>Descubra qual destes cuidados combina com o que você procura.</p>' +
        '<h4>Slide 2</h4><p><strong>O incômodo:</strong> “Queria as minhas pestanas mais destacadas, mas não tenho paciência para passar máscara todos os dias.”</p><p><strong>A solução:</strong> EXTENSÃO DE PESTANAS</p><p><strong>Imagem:</strong> cum resultado real, mostrando bem o efeito escolhido pela cliente.</p>' +
        '<h4>Slide 3</h4><p><strong>O incômodo:</strong> “Penteio as sobrancelhas, saio de casa e parece que os fios já estão todos fora do lugar.”</p><p><strong>A solução:</strong> BROW LAMINATION</p><p><strong>Imagem:</strong> resultado real em que a posição dos fios esteja visível.</p>' +
        '<h4>Slide 4</h4><p><strong>O incômodo:</strong> “Até tiro uns pelinhos em casa, mas nunca consigo deixar as sobrancelhas do jeito que gostaria.”</p><p><strong>A solução:</strong> DESIGN DE SOBRANCELHAS</p><p><strong>Imagem:</strong> antes e depois autorizado ou foto do resultado final.</p>' +
        '<h4>Slide 5</h4><p><strong>O incômodo:</strong> “Gosto das minhas pestanas naturais, mas queria vê-las mais curvadas e destacadas.”</p><p><strong>A solução:</strong> LASH LIFTING</p><p><strong>Imagem:</strong> close do resultado, de preferência com antes e depois autorizado.</p>' +
        '<h4>Slide 6</h4><p><strong>O incômodo:</strong> “Queria acordar com as sobrancelhas mais definidas, sem precisar preenchê-las todos os dias.”</p><p><strong>A solução:</strong> MICROPIGMENTAÇÃO DE SOBRANCELHAS <em>(sem foto pedida para este slide)</em></p>' +
        '<h4>Slide 7</h4><p>O seu olhar não precisa ser igual ao de ninguém para ser bonito.</p><p>O cuidado certo começa por entender o que você gostaria de valorizar.</p><p>Me chama no WhatsApp e conta qual destes incômodos falou mais com você. Vamos conversar sobre a melhor opção para valorizar o seu olhar.</p>' +
        '<h4>Legenda (texto do post)</h4><p>Às vezes você sabe o que gostaria de mudar no seu olhar, mas não sabe qual procedimento escolher. E tudo bem! 🤎</p><p>Se você é de Braga, me chama no WhatsApp e conta o que procura. Vamos conversar sobre o cuidado que faz sentido para você. ✨</p>',
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
      body: '<h4>Slide 1</h4><p>Quero ser sua profissional preferida de sobrancelhas e pestanas.</p><p>Então...</p>' +
        '<h4>Slide 2</h4><p>Antes de escolher qualquer procedimento, quero que você me conte como gosta do seu olhar. Vou te indicar o que mais combina com você</p><p><strong>Imagem:</strong> Nicole atendendo</p>' +
        '<h4>Slide 3</h4><p>Aqui, suas sobrancelhas não precisam seguir um molde.</p><p>O design é pensado para valorizar os seus traços e chegar a um resultado que você goste de ver no espelho.</p><p><strong>Imagem:</strong> Resultado real do processo, o desenho do design.</p>' +
        '<h4>Slide 4</h4><p>Nas pestanas, tem quem ame um efeito delicado e quem prefira mais destaque. Quero entender o que você procura antes de escolhermos o resultado.</p><p><strong>Imagem:</strong> aplicação ou resultado de extensão de pestanas.</p>' +
        '<h4>Slide 5</h4><p>Esse momento é seu.</p><p>Se quiser conversar durante o atendimento, ouvir uma música ou se preferir fechar os olhos e relaxar um pouquinho, fica à vontade também.</p><p><strong>Imagem:</strong> detalhes do espaço ou da Nicole a atender.</p>' +
        '<h4>Slide 6</h4><p>O meu desejo é que você se olhe no espelho e ame o que vê!</p><p>Se você é de Braga, me chama pelo WhatsApp no link da bio.</p>' +
        '<h4>Legenda (texto do post)</h4><p>Quero ser sua profissional preferida de sobrancelhas e pestanas.<br>Então...</p><p>Minha missão é valorizar o seu olhar e te deixar ainda mais linda!</p><p>Se você é de Braga, me chama no WhatsApp pelo link da bio. Vou adorar cuidar de você! ✨</p>',
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
