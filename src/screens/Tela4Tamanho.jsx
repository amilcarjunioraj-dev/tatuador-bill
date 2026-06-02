export default function Tela4Tamanho({ irParaTela, dados, atualizarDados }) {
  const handleTamanho = (valor) => {
    atualizarDados({ tamanho: parseInt(valor) });
  };

  const proximaTela = () => {
    if (dados.tamanho) {
      if (dados.modo === 'upload') {
        irParaTela(5); // Vai para Cor
      } else {
        irParaTela(6); // Vai para Cor (descrever)
      }
    }
  };

  const telaAtual = dados.modo === 'upload' ? 3 : 5;

  return (
    <div className="tela">
      <div className="header">
        <h2>Qual tamanho?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: {dados.modo === 'upload' ? '2/6' : '3/8'} (Tamanho)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: dados.modo === 'upload' ? '33%' : '37.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(dados.modo === 'upload' ? 3 : 4)}>
          ← VOLTAR
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>
            {dados.tamanho} cm
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="range"
            min="2"
            max="30"
            value={dados.tamanho}
            onChange={(e) => handleTamanho(e.target.value)}
            style={{ cursor: 'pointer', width: '100%' }}
          />
        </div>

        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '12px' }}>
            📏 Referências de tamanho:
          </p>
          <p style={{ fontSize: '11px', marginBottom: '5px' }}>🪙 Moeda = 2,5 cm</p>
          <p style={{ fontSize: '11px', marginBottom: '5px' }}>💳 Cartão = 8,5 cm</p>
          <p style={{ fontSize: '11px', marginBottom: '5px' }}>🖊️ Caneta = 15 cm</p>
          <p style={{ fontSize: '11px' }}>📄 Folha A4 = 21 x 30 cm</p>
        </div>

        <button className="btn-primario" onClick={proximaTela}>
          PRÓXIMO
        </button>
      </div>
    </div>
  );
}
