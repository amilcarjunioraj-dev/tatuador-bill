import { useState, useEffect } from 'react';
import { gerarImagensDalleE } from '../utils/dalleAPI';

export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(true);
  const [imagens, setImagens] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    // Evita chamar a API se não houver descrição
    if (!dados?.descricao_cliente) {
      setErro('Nenhuma descrição fornecida. Volte e preencha os dados.');
      setLoading(false);
      return;
    }

    const carregarImagens = async () => {
      setLoading(true);
      setErro('');

      try {
        const resultado = await gerarImagensDalleE(dados.descricao_cliente);
        // Garante que resultado seja um array
        setImagens(Array.isArray(resultado) ? resultado : []);
      } catch (e) {
        console.error('Erro na geração:', e);
        setErro('Erro ao gerar imagens: ' + (e.message || 'Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };

    carregarImagens();
  }, [dados?.descricao_cliente]); // dependência segura

  const handleEscolher = (numero) => {
    atualizarDados({ referencia_escolhida: numero });
    irParaTela(5);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>🎨 IA Gerando suas referências</h2>
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

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '32px', marginBottom: '20px' }}>🎨</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              Gerando referências com IA...
            </p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Isso pode levar 30-60 segundos
            </p>
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
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>⚠️ Erro</p>
            {erro}
            <button 
              className="btn-primario"
              onClick={() => window.location.reload()}
              style={{ marginTop: '10px' }}
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        )}

        {!loading && !erro && imagens.length > 0 && (
          <div>
            <div style={{
              background: '#fffef0',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '2px solid #FFD700'
            }}>
              <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                ✨ Escolha qual mais se aproxima:
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Baseado em: "{dados?.descricao_cliente || 'descrição não informada'}"
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '30px'
            }}>
              {imagens.map((img, idx) => (
                <div
                  key={img.numero || idx}
                  onClick={() => handleEscolher(img.numero)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFD700';
                    e.currentTarget.style.boxShadow = '0 0 10px #FFD700';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {img.url ? (
                    <>
                      <img
                        src={img.url}
                        alt={img.descricao || `Opção ${img.numero}`}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          marginBottom: '10px'
                        }}
                      />
                      <div style={{ padding: '10px', background: '#f5f5f5' }}>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
                          Opção {img.numero}
                        </p>
                        <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                          {img.descricao}
                        </p>
                        <button
                          className="btn-primario"
                          style={{ fontSize: '12px', padding: '8px', width: '100%' }}
                        >
                          Escolher
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{
                      height: '250px',
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px'
                    }}>
                      <p style={{ color: '#999' }}>Erro ao gerar</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
