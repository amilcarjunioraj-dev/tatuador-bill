export default function Tela6_Resultado({ irParaTela, dados, atualizarDados }) {
  // Tabela de preços base por estilo
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

  // Multiplicador de tamanho
  const getMultiplicadorTamanho = (tamanho) => {
    if (tamanho <= 5) return 0.8;
    if (tamanho <= 10) return 1.0;
    if (tamanho <= 15) return 1.3;
    if (tamanho <= 20) return 1.6;
    return 2.0;
  };

  // Tempo estimado
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

  // Calcular preço
  const calcularPreco = () => {
    const precoBase = precosBase[dados.estilo] || 200;
    const multTamanho = getMultiplicadorTamanho(dados.tamanho);
    const multCor = dados.multiplicador_cor || 1.0;
    
    let preco = precoBase * multTamanho * multCor;
    return Math.round(preco / 10) * 10; // Arredondar para 10
  };

  // Escala de dor
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
  const tempo = getTempoEstimado(dados.estilo, dados.tamanho);
  const dor = getEscalaDor(dados.estilo);

  const proximaTela = () => {
    atualizarDados({ preco, tempo_estimado: tempo });
    irParaTela(7);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Seu Orçamento</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 5/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '62.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(5)}>
          ← VOLTAR
        </div>

        {/* RESUMO */}
        <div className="resumo">
          <div className="resumo-item">
            <span>Estilo:</span>
            <strong>{dados.estilo_nome}</strong>
          </div>
          <div className="resumo-item">
            <span>Tamanho:</span>
            <strong>{dados.tamanho} cm</strong>
          </div>
          <div className="resumo-item">
            <span>Cor:</span>
            <strong>{dados.cor_nome}</strong>
          </div>
          <div className="resumo-item">
            <span>Local:</span>
            <strong>{dados.local_nome}</strong>
          </div>
        </div>

        {/* VALOR */}
        <div className="resumo-valor">
          R$ {preco.toLocaleString('pt-BR')}
        </div>

        {/* TEMPO */}
        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '5px' }}>⏱️ Tempo estimado:</p>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{tempo} minutos</p>
        </div>

        {/* ESCALA DE DOR */}
        <div style={{
          background: '#fffef0',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
            🎨 Nível de dor esperado:
          </p>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            {dor.estrelas}
          </p>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
            "{dor.desc}"
          </p>

          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
            📌 DICAS IMPORTANTES:
          </p>
          <ul style={{ fontSize: '12px', color: '#666', marginLeft: '20px' }}>
            <li>✓ Durma bem antes da tatuagem</li>
            <li>✓ Coma bem (não em jejum)</li>
            <li>✓ Evite álcool 24h antes</li>
            <li>✓ Não beba café (deixa sensível)</li>
            <li>✓ Traga água/suco para beber</li>
          </ul>

          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', marginTop: '15px' }}>
            💪 DURANTE A TATUAGEM:
          </p>
          <ul style={{ fontSize: '12px', color: '#666', marginLeft: '20px' }}>
            <li>✓ Respire fundo e devagar</li>
            <li>✓ Conte histórias/ouça música mental</li>
            <li>✓ Se tá muito intenso, avisa Bill</li>
            <li>✓ Bill faz pausas quando precisa</li>
          </ul>
        </div>

        {/* OPÇÕES DE PAGAMENTO */}
        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>
            💳 Formas de pagamento:
          </p>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>
            💰 <strong>PIX / DINHEIRO:</strong> R$ {preco.toLocaleString('pt-BR')}
          </p>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>
            💳 <strong>DÉBITO:</strong> R$ {Math.round(preco * 1.0135).toLocaleString('pt-BR')} (1,35%)
          </p>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>
            💳 <strong>CRÉDITO À VISTA:</strong> R$ {Math.round(preco * 1.0314).toLocaleString('pt-BR')} (3,14%)
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Parcelamento disponível no agendamento
          </p>
        </div>

        <button className="btn-primario" onClick={proximaTela}>
          AGENDAR AGORA
        </button>
      </div>
    </div>
  );
}
