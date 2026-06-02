import { useState, useEffect } from 'react';
import { gerarImagens } from '../utils/gerarImagensUtil';

export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    gerarReferencias();
  }, []);

  const gerarReferencias = async () => {
    setLoading(true);
    setErro('');

    try {
      const resultado = await gerarImagens(dados.descricao_cliente);
      setImagens(resultado.imagens);
    } catch (e) {
      setErro('Erro ao gerar referências. Tente novamente: ' + e.message);
      setLoading(false);
    }
  };

  const handleEscolher = (numero) => {
    atualizarDados({ 
      referencia_escolhida: numero,
      referencia_descricao: `Variação ${String.fromCharCode(64 + numero)}`
    });
    irParaTela(4);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>🎨 Gerando referências...</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 2/7 (Referências)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '28.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(2)}>
          ← VOLTAR
        </div>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <p style={{ fontSize: '32px', marginBottom: '20px' }}>⏳</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              Nossa IA está criando suas referências...
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '30px' }}>
              Isso pode levar alguns segundos
            </p>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f5f5f5',
              borderTop: '4px solid #FFD700',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {erro && (
          <div style={{
            background: '#ffebee',
            border: '2px solid #ff6b6b',
            color: '#c92a2a',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
              ⚠️ {erro}
            </p>
            <button 
              className="btn-primario"
              onClick={gerarReferencias}
              style={{ marginTop: '10px' }}
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        )}

        {!loading && !erro && (
          <div>
            <div style={{
              background: '#fffef0',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '2px solid #FFD700'
            }}>
              <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                ✨ Escolha qual variação mais se aproxima da sua ideia:
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Cada número abaixo representa um estilo diferente baseado na sua descrição
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '30px'
            }}>
              {imagens.map((img) => (
                <div
                  key={img.numero}
                  onClick={() => handleEscolher(img.numero)}
                  style={{
                    cursor: 'pointer',
                    background: '#f5f5f5',
                    borderRadius: '8px',
                    padding: '15px',
                    textAlign: 'center',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFD700';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '10px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff',
                    borderRadius: '6px',
                    marginBottom: '10px'
                  }}>
                    {img.status === 'gerada' ? '🎨' : '⚠️'}
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '5px'
                  }}>
                    Opção {img.numero}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '10px'
                  }}>
                    {img.descricao}
                  </p>
                  <button
                    className="btn-primario"
                    style={{
                      fontSize: '12px',
                      padding: '10px',
                      marginTop: '10px'
                    }}
                  >
                    Escolher
                  </button>
                </div>
              ))}
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
        )}
      </div>
    </div>
  );
}
