export default function Tela6Resultado({ irParaTela, dados, atualizarDados }) {
  const precosBase = {
    fine_line: 150,
    nome: 130,
    flor: 200,
    animal: 280,
    old_school: 250,
    neo_tradicional: 300,
    blackwork: 350,
    camuflagem: 400
  };

  const getMultiplicadorTamanho = (tamanho) => {
    if (tamanho <= 5) return 0.8;
    if (tamanho <= 10) return 1.0;
    if (tamanho <= 15) return 1.3;
    if (tamanho <= 20) return 1.6;
    return 2.0;
  };

  const getTempoEstimado = (estilo, tamanho) => {
    const temposBase = {
      fine_line: 45,
      nome: 30,
      flor: 60,
      animal: 90,
      old_school: 120,
      neo_tradicional: 120,
      blackwork: 150,
      camuflagem: 180
    };
    
    const tempo = temposBase[estilo] || 60;
    const multiplicador = getMultiplicadorTamanho(tamanho);
    return Math.round(tempo * multiplicador);
  };

  const calcularPreco = () => {
    if (dados.imagem_analisada) {
      return dados.preco;
    }

    const precoBase = precosBase[dados.estilo] || 200;
    const multTamanho = getMultiplicadorTamanho(dados.tamanho);
    const multCor = dados.cor === 'colorido' ? 1.3 : (dados.cor === 'cinza' ? 1.1 : 1.0);
    
    let preco = precoBase * multTamanho * multCor;
    return Math.round(preco / 10) * 10;
  };

  const getEscalaDor = (estilo) => {
    const escalas = {
      fine_line: { estrelas: '⭐⭐', desc: 'Como uma caneta escrever na pele' },
      nome: { estrelas: '⭐⭐', desc: 'Bastante leve e rápido' },
      flor: { estrelas: '⭐⭐⭐', desc: 'Média, sensação de beliscão' },
      animal: { estrelas: '⭐⭐⭐⭐', desc: 'Mais intensa, linha contínua' },
      old_school: { estrelas: '⭐⭐⭐⭐', desc: 'Linhas grossas, mais pressão' },
      neo_tradicional: { estrelas: '⭐⭐⭐⭐', desc: 'Cores vibrantes, mais time' },
      blackwork: { estrelas: '⭐⭐⭐⭐⭐', desc: 'Muito intenso, preenchimento' },
      camuflagem: { estrelas: '⭐⭐⭐⭐⭐', desc: 'Maior tempo, sensação contínua' }
    };
    return escalas[estilo] || { estrelas: '⭐⭐⭐', desc: 'Sensação moderada' };
  };

  const preco = calcularPreco();
  const tempo = dados.imagem_analisada ? dados.tempo_estimado : getTempoE
