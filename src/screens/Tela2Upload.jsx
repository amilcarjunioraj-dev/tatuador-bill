import { useState } from 'react';
import { analisarImagemComGemini } from '../utils/geminiAPI';

export default function Tela2Upload({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [previewImagem, setPreviewImagem] = useState('');

  const handleImagemUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setErro('');
    setLoading(true);

    try {
      // Converter imagem para base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result.split(',')[1];
        setPreviewImagem(e.target.result);

        try {
          // Enviar para IA
          const analise = await analisarImagemComGemini(base64String);

          // Atualizar dados com análise da IA
          atualizarDados({
            estilo: analise.tipo,
            estilo_nome: normalizarEstilo(analise.tipo),
            tamanho: analise.tamanho_estimado_cm,
            complexidade: analise.complexidade,
            descricao_ia: analise.descricao,
            preco: analise.preco,
            tempo_estimado: analise.tempo_minutos,
            pode_fazer: analise.pode_fazer,
            observacoes_ia: analise.observacoes,
            imagem_analisada: true,
          });

          if (!analise.pode_fazer) {
            setErro('⚠️ Bill não consegue fazer este tipo de tatuagem. Escolha outro estilo!');
            setLoading(false);
            return;
          }

          // Ir para próxima tela
          setTimeout(() => {
            irParaTela(3);
          }, 1000);
        } catch (erroAnalise) {
          setErro('Erro ao analisar imagem. Tente novamente: ' + erroAnalise.message);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setErro('Erro ao carregar imagem: ' + e.message);
      setLoading(false);
    }
  };

  const normalizarEstilo = (tipo) => {
    const estilos = {
      fine_line: 'Fine Line',
      flor: 'Flor/Botânica',
      animal: 'Animal',
      old_school: 'Old School',
      neo_tradicional: 'Neo Tradicional',
      blackwork: 'Blackwork',
      camuflagem: 'Camuflagem Cicatriz',
      nome: 'Nome',
      outro: 'Outro',
    };
    return estilos[tipo] || 'Outro';
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>📸 Envie sua ideia</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 1/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '12.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(2)}>
          ← VOLTAR
        </div>

        {/* PREVIEW */}
        {previewImagem && (
          <div style={{
            background: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <img 
              src={previewImagem} 
              alt="Preview" 
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                marginBottom: '10px'
              }}
            />
            <p style={{ fontSize: '12px', color: '#666' }}>
              Analisando sua imagem...
            </p>
          </div>
        )}

        {/* ERRO */}
        {erro && (
          <div style={{
            background: '#ffebee',
            border: '2px solid #ff6b6b',
            color: '#c92a2a',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '12px'
          }}>
            {erro}
          </div>
        )}

        {/* UPLOAD */}
        {!loading && (
          <div style={{
            background: '#fffef0',
            border: '3px dashed #FFD700',
            padding: '40px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <p style={{ fontSize: '32px', marginBottom: '10px' }}>📤</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
              Clique ou arraste a imagem
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
              PNG, JPG, GIF (máx 5MB)
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImagemUpload}
              disabled={loading}
              style={{
                display: 'none',
                cursor: 'pointer'
              }}
              id="file-input"
            />
            <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
              <button 
                className="btn-primario"
                onClick={() => document.getElementById('file-input').click()}
                disabled={loading}
                style={{ marginBottom: '10px' }}
              >
                ESCOLHER IMAGEM
              </button>
            </label>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px'
          }}>
            <p style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Analisando sua imagem...
            </p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Nossa IA está estudando os detalhes
            </p>
          </div>
        )}

        {/* DICAS */}
        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
            ✅ DICAS PARA MELHOR ANÁLISE:
          </p>
          <ul style={{ fontSize: '11px', marginLeft: '20px', color: '#666' }}>
            <li>Envie uma imagem clara e bem iluminada</li>
            <li>Se possível, mostre o tamanho aproximado</li>
            <li>Foto de celular ou desenho funcionam bem</li>
            <li>Se for referência, indique cores desejadas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
