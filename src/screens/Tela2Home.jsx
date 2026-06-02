export default function Tela2Home({ irParaTela, dados, atualizarDados }) {
  const handleUpload = () => {
    atualizarDados({ modo: 'upload' });
    irParaTela(3); // Vai para Tela2Upload
  };

  const handleDescrever = () => {
    atualizarDados({ modo: 'descrever' });
    irParaTela(3); // Vai para Tela2Descricao
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Como você quer começar?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 1/7 (Escolher Modo)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '14.2%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(1)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
            Escolha uma opção abaixo:
          </p>

          <div
            className="card"
            onClick={handleUpload}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon">📸</div>
            <div className="card-title">Enviar Imagem</div>
            <div className="card-desc">
              Deixe a IA analisar sua ideia e criar um orçamento personalizado
            </div>
          </div>

          <div
            className="card"
            onClick={handleDescrever}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon">✏️</div>
            <div className="card-title">Descrever Tatuagem</div>
            <div className="card-desc">
              Descreva com detalhes e a IA gera 4 referências para você escolher
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
            Se você tem uma ideia ou referência de tatuagem, envie a imagem ou descreva com detalhes! Nossa IA vai criar um orçamento customizado baseado exatamente no que você quer.
          </p>
        </div>
      </div>
    </div>
  );
}
