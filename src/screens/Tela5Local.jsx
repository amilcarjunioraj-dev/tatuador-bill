export default function Tela5_Local({ irParaTela, dados, atualizarDados }) {
  const locais = [
    { id: 'braco', nome: 'Braço', icon: '💪' },
    { id: 'antebraco', nome: 'Antebraço', icon: '💪' },
    { id: 'perna', nome: 'Perna', icon: '🦵' },
    { id: 'costas', nome: 'Costas', icon: '🔙' },
    { id: 'peito', nome: 'Peito', icon: '🔴' },
    { id: 'pescoco', nome: 'Pescoço', icon: '🔴' }
  ];

  const handleLocal = (local) => {
    atualizarDados({ local: local.id, local_nome: local.nome });
    irParaTela(6);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Onde no corpo?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 4/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(4)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {dados.estilo_nome} | {dados.tamanho} cm | {dados.cor_nome}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {locais.map((local) => (
            <div
              key={local.id}
              className={`card ${dados.local === local.id ? 'selecionado' : ''}`}
              onClick={() => handleLocal(local)}
              style={{ margin: '0', padding: '20px', textAlign: 'center' }}
            >
              <div className="card-icon">{local.icon}</div>
              <div className="card-title">{local.nome}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Outro:
          </label>
          <input
            type="text"
            placeholder="Descreva o local"
            onChange={(e) => {
              if (e.target.value) {
                atualizarDados({ local: 'outro', local_nome: e.target.value });
              }
            }}
          />
        </div>

        <button 
          className="btn-primario" 
          onClick={() => {
            if (dados.local) irParaTela(6);
          }}
          style={{ marginTop: '20px' }}
        >
          PRÓXIMO
        </button>
      </div>
    </div>
  );
}
