export default function Tela6Local({ irParaTela, dados, atualizarDados }) {
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
    
    if (dados.modo === 'upload') {
      irParaTela(7); // Vai para Resultado
    } else {
      irParaTela(8); // Vai para Resultado (descrever)
    }
  };

  const voltarPara = dados.modo === 'upload' ? 5 : 6;

  return (
    <div className="tela">
      <div className="header">
        <h2>Onde no corpo?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: {dados.modo === 'upload' ? '4/6' : '5/8'} (Local)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: dados.modo === 'upload' ? '66%' : '62.5%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(voltarPara)}>
          ← VOLTAR
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', textAlign: 'center' }}>
            {dados.tamanho} cm | {dados.cor_nome}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          {locais.map((local) => (
            <div
              key={local.id}
              className={`card ${dados.local === local.id ? 'selecionado' : ''}`}
              onClick={() => handleLocal(local)}
              style={{ margin: '0', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
            >
              <div className="card-icon">{local.icon}</div>
              <div className="card-title">{local.nome}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            ✨ PRÓXIMO PASSO:
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Você verá o orçamento final e poderá simular o parcelamento em até 12 vezes!
          </p>
        </div>
      </div>
    </div>
  );
}
