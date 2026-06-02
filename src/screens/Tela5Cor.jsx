export default function Tela5Cor({ irParaTela, dados, atualizarDados }) {
  const cores = [
    { id: 'preto', nome: 'Preto & Branco', desc: 'Clássico e elegante', multiplicador: 1.0 },
    { id: 'cinza', nome: 'Preto + Cinza', desc: 'Com sombreado', multiplicador: 1.1 },
    { id: 'colorida', nome: 'Colorida', desc: 'Vibrante e chamativa', multiplicador: 1.3 }
  ];

  const handleCor = (cor) => {
    atualizarDados({ 
      cor: cor.id, 
      cor_nome: cor.nome,
      multiplicador_cor: cor.multiplicador
    });
    irParaTela(6);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Que cor você prefere?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 4/7 (Cor)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '57.1%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(4)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', textAlign: 'center' }}>
            {dados.tamanho} cm | {dados.referencia_descricao}
          </p>
        </div>

        {cores.map((cor) => (
          <div
            key={cor.id}
            className={`card ${dados.cor === cor.id ? 'selecionado' : ''}`}
            onClick={() => handleCor(cor)}
          >
            <div className="card-title">{cor.nome}</div>
            <div className="card-desc">{cor.desc}</div>
          </div>
        ))}

        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '30px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            ✨ PRÓXIMO PASSO:
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Você vai escolher onde no corpo quer a tatuagem. Depois a IA vai calcular o valor final!
          </p>
        </div>
      </div>
    </div>
  );
}
