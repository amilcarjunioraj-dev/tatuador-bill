export default function Tela4_Cor({ irParaTela, dados, atualizarDados }) {
  const cores = [
    { id: 'preto', nome: 'Preto & Branco', desc: 'Clássico, limpo', preco: 1.0 },
    { id: 'cinza', nome: 'Preto + Cinza', desc: 'Com sombreado (+10%)', preco: 1.1 },
    { id: 'colorido', nome: 'Colorida', desc: 'Vibrante, chamativa (+30%)', preco: 1.3 }
  ];

  const handleCor = (cor) => {
    atualizarDados({ cor: cor.id, cor_nome: cor.nome, multiplicador_cor: cor.preco });
    irParaTela(5);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Que cor você prefere?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 3/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '37.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(3)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {dados.estilo_nome} | {dados.tamanho} cm
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
      </div>
    </div>
  );
}
