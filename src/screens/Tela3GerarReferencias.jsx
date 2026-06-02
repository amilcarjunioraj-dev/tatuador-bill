import { useState, useEffect } from 'react';
import { buscarImagensTatuagem } from '../utils/unsplashAPI';

export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(true);
  const [imagens, setImagens] = useState([]);
  const [erro, setErro] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const carregarImagens = async () => {
      setLoading(true);
      setErro('');

      try {
        const resultado = await buscarImagensTatuagem(dados.descricao_cliente);
        setImagens(resultado);
      } catch (e) {
        setErro('Erro ao carregar imagens: ' + e.message);
      }

      setLoading(false);
    };

    carregarImagens();
  }, []);

  const handleEscolher = (numero) => {
    atualizarDados({ referencia_escolhida: numero });
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

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '32px', marginBottom: '20px' }}>⏳</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Procurando referências...
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
                ✨ Escolha qual se aproxima mais:
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Baseado em: "{dados.descricao_cliente}"
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
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFD700';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  {img.url ? (
                    <>
                      <img
                        src={img.url}
                        alt={img.descricao}
                        style={{
                          width: '100%',
                          height: '200px',
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
                        <p style={{ fontSize: '9px', color: '#999' }}>
                          Foto: {img.autor}
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
                      height: '200px',
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px'
                    }}>
                      <p style={{ color: '#999' }}>Sem imagem</p>
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
