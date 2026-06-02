export default function Tela2Home({ irParaTela, dados, atualizarDados }) {
  return (
    <div className="tela">
      <div className="header">
        <h2>Como você quer começar?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 1/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '12.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(1)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
            Escolha uma opção abaixo:
          </p>

          {/* OPÇÃO 1: UPLOAD DE IMAGEM */}
          <div
            className="card"
            onClick={() => irParaTela(2.5)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon">📸</div>
            <div className="card-title">Enviar Imagem</div>
            <div className="card-desc">
              Deixe a IA analisar sua ideia e criar um orçamento personalizado
            </div>
          </div>

          {/* OPÇÃO 2: ESCOLHER MANUALMENTE */}
          <div
            className="card"
            onClick={() => irParaTela(2)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon">✨</div>
            <div className="card-title">Escolher Estilo</div>
            <div className="card-desc">
              Selecione passo a passo o tipo de tatuagem que deseja
            </div>
          </div>
        </div>

        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            💡 DICA:
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Se você tem uma ideia ou referência de tatuagem, envie a imagem! Nossa IA vai analisar e fazer um orçamento mais preciso com base no que você realmente quer.
          </p>
        </div>
      </div>
    </div>
  );
}
