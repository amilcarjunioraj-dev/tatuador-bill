import { useState } from 'react';

export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const referenciasFixas = [
    {
      numero: 1,
      descricao: 'Variação A - Minimalista',
      estilo: 'Traços finos e elegantes'
    },
    {
      numero: 2,
      descricao: 'Variação B - Cursiva Fluida',
      estilo: 'Letras cursivas suaves'
    },
    {
      numero: 3,
      descricao: 'Variação C - Cursiva Dramática',
      estilo: 'Letras cursivas com estilo'
    },
    {
      numero: 4,
      descricao: 'Variação D - Cursiva Clássica',
      estilo: 'Letras cursivas tradicionais'
    }
  ];

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
            ✨ Escolha qual variação mais se aproxima da sua ideia:
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
          {referenciasFixas.map((ref) => (
            <div
              key={ref.numero}
              onClick={() => handleEscolher(ref.numero)}
              style={{
                cursor: 'pointer',
                background: '#f5f5f5',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center',
                border: '2px solid transparent',
                transition: 'all 0.3s ease'
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
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                borderRadius: '6px'
              }}>
                ✍️
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                Opção {ref.numero}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '10px'
              }}>
                {ref.estilo}
              </p>
              <button
                className="btn-primario"
                style={{
                  fontSize: '12px',
                  padding: '10px'
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
    </div>
  );
}
