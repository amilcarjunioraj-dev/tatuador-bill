export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  const handleEscolher = (numero) => {
    atualizarDados({ 
      referencia_escolhida: numero,
      referencia_descricao: `Variação ${String.fromCharCode(64 + numero)}`
    });
    irParaTela(5);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>🎨 Escolha sua referência</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 2/8 (Referências)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '25%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(3)}>
          ← VOLTAR
        </div>

        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
            ✨ Escolha qual variação mais se aproxima:
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Sua descrição: "{dados.descricao_cliente}"
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div
            onClick={() => handleEscolher(1)}
            style={{
              cursor: 'pointer',
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              border: '2px solid transparent'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✍️</div>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
              Opção 1
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Minimalista
            </p>
            <button className="btn-primario" style={{ fontSize: '12px', padding: '10px' }}>
              Escolher
            </button>
          </div>

          <div
            onClick={() => handleEscolher(2)}
            style={{
              cursor: 'pointer',
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              border: '2px solid transparent'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✍️</div>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
              Opção 2
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Fluida
            </p>
            <button className="btn-primario" style={{ fontSize: '12px', padding: '10px' }}>
              Escolher
            </button>
          </div>

          <div
            onClick={() => handleEscolher(3)}
            style={{
              cursor: 'pointer',
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              border: '2px solid transparent'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✍️</div>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
              Opção 3
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Dramática
            </p>
            <button className="btn-primario" style={{ fontSize: '12px', padding: '10px' }}>
              Escolher
            </button>
          </div>

          <div
            onClick={() => handleEscolher(4)}
            style={{
              cursor: 'pointer',
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              border: '2px solid transparent'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✍️</div>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
              Opção 4
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Clássica
            </p>
            <button className="btn-primario" style={{ fontSize: '12px', padding: '10px' }}>
              Escolher
            </button>
          </div>
        </div>

        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Após escolher, você vai definir tamanho, cor e local da tatuagem
          </p>
        </div>
      </div>
    </div>
  );
}
