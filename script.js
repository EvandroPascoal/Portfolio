const badgesInfo = {
  analytics: {
    titulo: "Associate - Analytics Engineering",
    emitido: "Itaú Unibanco",
    descricao: `A pessoa que detém este Badge possui conhecimentos sobre aplicação da Engenharia de Analytics no Itaú, e conhecimentos sobre as principais ferramentas de mercado e serviços da AWS utilizados no banco, demonstrando habilidades para resolver problemas e finalizar tarefas com escopo claro e definido.`,
    habilidades: ["Database Analysis", "Data Mining", "Data View"],
    criterios: `Concluir todos os testes intermediários, com nota igual ou superior a 70% em cada um dos módulos do programa Associate - Engenharia de Analytics.`
  },
  engineering: {
    titulo: "Associate - Data Engineering",
    emitido: "Itaú Unibanco",
    descricao: "A pessoa que detém este badge, possui conhecimentos sobre aplicação da Engenharia de Dados no Itaú, e conhecimentos sobre as principais ferramentas de mercado e serviços da AWS utilizados no banco, demonstrando habilidades para resolver problemas e finalizar tarefas com escopo claro e definido.",
    habilidades: ["Database Administration", "Data Mining", "ETL"],
    criterios: "Concluir todos os testes intermediários, com nota igual ou superior a 70% em cada um dos módulos do programa Associate - Engenharia de Dados."
  },
  generative: {
    titulo: "Practitioner - Generative AI",
    emitido: "Itaú Unibanco",
    descricao: "A pessoa que detém este Badge adquiriu os conceitos fundamentais sobre Inteligência Artificial Generativa, tanto no aspecto teórico quanto no prático. É capaz de entender os alicerces básicos da mecânica que sustenta as principais ferramentas de Inteligência Artificial Generativa, bem como compreender os seus potenciais casos de uso no âmbito social.",
    habilidades: ["Artificial Intelligence (AI)", "Machine Learning Algorithms", "Machine Learning (ML)"],
    criterios: "Acessar todas as trilhas Practitioner - IA Generativa, explorar os conteúdos e concluí-las."
  },
  business: {
    titulo: "Practitioner - Business Analytics",
    emitido: "Itaú Unibanco",
    descricao: "A pessoa que detém este Badge, possui conhecimentos básicos sobre programação para analise de dados, analise estatística, comunicação com dados, ferramentas para analise de dados no Itaú e experimentação nos negócios, entendendo melhor os conceitos do que é ser data-driven na pratica.",
    habilidades: ["Analise Exploratória de Dados", "Analytics Tools", "Data Driven Instruction"],
    criterios: "Acessar todas as trilhas do plano Practitioner - Business Analytics, explorar os conteúdos e concluí-las."
  },
  foundation: {
    titulo: "Practitioner - D&A Foundation",
    emitido: "Itaú Unibanco",
    descricao: "A pessoa que detém esta Badge possui conhecimentos básicos sobre disciplinas relacionadas a dados, tendo sido introduzida aos conceitos e termos correntes em áreas como: Modelagem de Dados, Engenharia de Dados e Analytics, Ciência de Dados, Engenharia de Machine Learning e Governança de Dados. Sendo, portanto, letrada em dados, tendo intuição sobre o ciclo do dado, desde sua aquisição e tratamento até análises avançadas, entrega contínua e geração de valor.",
    habilidades: ["Analise Exploratória de Dados", "Analytical Skills", "Data Driven Instruction"],
    criterios: "Acesse todas as trilhas do plano Practitioner - Fundação de Dados, explorar os conteúdos e concluí-las."
  }
};

const positions = {
  analytics: "20%",
  engineering: "40%",
  generative: "60%",
  business: "20%",
  foundation: "40%"
};

const infoDiv = document.querySelector(".info-2");
const badgeElements = document.querySelectorAll(".badges > div");

// Função para ativar/desativar hover conforme tamanho da tela
function ativarHoverBadges() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    // Remove eventos de hover em telas pequenas
    badgeElements.forEach(badge => {
      badge.replaceWith(badge.cloneNode(true));
    });
  } else {
    // Ativa hover normalmente em telas grandes
    badgeElements.forEach(badge => {
      badge.addEventListener("mouseenter", () => {
        const key = badge.classList[0];
        const data = badgesInfo[key];
        if (data) {
          infoDiv.innerHTML = `
            <h3>${data.titulo}</h3>
            <p><strong>Emitido por:</strong> ${data.emitido}</p>
            <p>${data.descricao}</p>
            <h4>Habilidades</h4>
            <ul>${data.habilidades.map(h => `<li>${h}</li>`).join("")}</ul>
            <h4>Critérios de recebimento</h4>
            <p>${data.criterios}</p>
          `;
          infoDiv.style.marginLeft = positions[key];
          infoDiv.classList.add("show");
        }
      });

      badge.addEventListener("mouseleave", () => {
        infoDiv.classList.remove("show");
      });
    });
  }
}

// ========================================================

// Função para altura da navbar
function navbarAltura() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    return window.innerWidth * 0.61; // 61vw em telas pequenas
  }
  return window.innerWidth * 0.20; // 20vw em telas grandes
}

const secoes = [
  { id: '.caixa-2', botao: '.texto_hover_ex' },
  { id: '.caixa-3', botao: '.texto_hover_pro' },
  { id: '.caixa-cert', botao: '.texto_hover_hard' },
  { id: '.caixa-hard', botao: '.texto_hover_cert' }
];

// Scroll suave ao clicar
document.querySelectorAll('.textos div').forEach(link => {
  link.addEventListener('click', () => {
    const text = link.textContent.trim();
    let alvo = null;

    if (text === "Experiência") alvo = document.querySelector('.caixa-2');
    if (text === "Projetos") alvo = document.querySelector('.caixa-3');
    if (text === "Certificações") alvo = document.querySelector('.caixa-cert');
    if (text === "Hard Skills") alvo = document.querySelector('.caixa-hard');

    if (alvo) {
      window.scrollTo({
        top: alvo.offsetTop - navbarAltura(),
        behavior: 'smooth'
      });
    }
  });
});

// Função de atualização do menu conforme scroll
function atualizarDestaque() {
  // Ajusta o offset do menu dependendo da tela
  const offsetMenu = window.matchMedia("(max-width: 768px)").matches
    ? window.innerWidth * 0.50
    : window.innerWidth * 0.10;

  const offsetAtivacao = navbarAltura() + offsetMenu;
  const scrollY = window.scrollY;

  const presente = document.querySelector('.caixa-presente');
  const limitePresente = presente.offsetTop - offsetAtivacao;

  if (scrollY >= limitePresente) {
    secoes.forEach(sec => {
      const botao = document.querySelector(sec.botao);
      botao.style.backgroundColor = 'transparent';
    });
    return;
  }

  let ativa = secoes[0];
  secoes.forEach(sec => {
    const el = document.querySelector(sec.id);
    if (el.offsetTop - offsetAtivacao <= scrollY) {
      ativa = sec;
    }
  });

  secoes.forEach(sec => {
    const botao = document.querySelector(sec.botao);
    botao.style.backgroundColor = (sec === ativa) ? '#ff6201ca' : 'transparent';
  });
}

// ==================================
const presenteFechado = document.getElementById('presenteFechado');
const presenteAberto = document.getElementById('presenteAberto');

presenteFechado.addEventListener('click', () => {
  presenteFechado.style.opacity = '0';
  presenteFechado.style.transform = 'scale(0.8)';
  setTimeout(() => {
    presenteFechado.style.display = 'none';
    presenteAberto.classList.add('mostrar');
  }, 600);
});

// Inicializa
window.addEventListener('load', () => {
  atualizarDestaque();
  ativarHoverBadges();
});
window.addEventListener('scroll', atualizarDestaque);
window.addEventListener('resize', () => {
  atualizarDestaque();
  ativarHoverBadges();
});

// ----------------------

const style2 = document.querySelector('link[href="style_2.css"]');

function checarTamanhoTela() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    style2.disabled = true;  // Desativa o CSS
  } else {
    style2.disabled = false; // Reativa quando voltar pro desktop
  }
}

// Executa ao carregar e quando redimensionar
checarTamanhoTela();
window.addEventListener("resize", checarTamanhoTela);
