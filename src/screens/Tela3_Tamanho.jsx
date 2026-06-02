export default function Tela3_Tamanho({ irParaTela, dados, atualizarDados }) {
  const handleTamanho = (valor) => {
    atualizarDados({ tamanho: parseInt(valor) });
  };

  const proximaTela = () => {
    if (dados.tamanho) irParaTela(4);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Qual tamanho?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 2/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '25%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(2)}>
          ← VOLTAR
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>
            {dados.estilo_nome} | {dados.tamanho} cm
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
          <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '24px', fontWeight: 'bold', color: '#FFD700' }}>
            {dados.tamanho} cm
          </p>
        </div>

        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>📏 Referências:</p>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>🪙 Moeda = 2,5 cm</p>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>💳 Cartão = 8,5 cm</p>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>🖊️ Caneta = 15 cm</p>
          <p style={{ fontSize: '12px' }}>📄 Folha A4 = 21 x 30 cm</p>
        </div>

        <button className="btn-primario" onClick={proximaTela}>
          PRÓXIMO
        </button>
      </div>
    </div>
  );
}
