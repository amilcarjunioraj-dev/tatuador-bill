import { useState } from 'react';

export default function Tela2Descricao({ irParaTela, dados, atualizarDados }) {
  const [descricao, setDescricao] = useState(dados.descricao_cliente || '');
  const [erro, setErro] = useState('');

  const handleContinuar = () => {
    if (!descricao.trim()) {
      setErro('Por favor, descreva sua tatuagem com detalhes');
      return;
    }

    if (descricao.trim().length < 20) {
      setErro('Descreva com mais detalhes (mínimo 20 caracteres)');
      return;
    }

    atualizarDados({ descricao_cliente: descricao });
    irParaTela(3);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Descreva sua tatuagem</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 1/7 (Descrição)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '14.2%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(2)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Descreva sua ideia de tatuagem com o máximo de detalhes possível. 
            Quanto mais detalhes, melhor a IA vai entender e gerar referências!
          </p>
        </div>

        {erro && (
          <div style={{
            background: '#ffebee',
            border: '2px solid #ff6b6b',
            color: '#c92a2a',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '12px'
          }}>
            ⚠️ {erro}
          </div>
        )}

        <textarea
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
            setErro('');
          }}
          placeholder="Ex: Quero uma borboleta colorida com flores ao redor, estilo fine line minimalista, com cores rosa e roxo, que pareça delicada mas com presença..."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '15px',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical',
            marginBottom: '20px'
          }}
        />

        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
            💡 DICAS PARA MELHOR DESCRIÇÃO:
          </p>
          <ul style={{ fontSize: '11px', marginLeft: '20px', color: '#666' }}>
            <li>Descreva o objeto/animal/símbolo principal</li>
            <li>Mencione elementos adicionais (flores, folhas, etc)</li>
            <li>Fale sobre o estilo desejado (minimalista, realista, geométrico)</li>
            <li>Cite cores se tiver preferência</li>
            <li>Descreva o "vibe" ou sensação que quer passar</li>
            <li>Quanto mais específico, melhor!</li>
          </ul>
        </div>

        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            ✨ O QUE ACONTECE DEPOIS:
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Nossa IA vai gerar 4 variações diferentes de referências baseadas na sua descrição. Você escolhe qual mais se aproxima da sua ideia!
          </p>
        </div>

        <button 
          className="btn-primario"
          onClick={handleContinuar}
        >
          GERAR REFERÊNCIAS ({descricao.length} caracteres)
        </button>
      </div>
    </div>
  );
}
