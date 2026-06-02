export default function Tela2_Estilo({ irParaTela, dados, atualizarDados }) {
  const estilos = [
    { id: 'fine_line', icon: '✨', nome: 'Fine Line', desc: 'Traços finos, delicado' },
    { id: 'nome', icon: '✏️', nome: 'Nome', desc: 'Letras customizadas' },
    { id: 'flor', icon: '🌸', nome: 'Flor/Botânica', desc: 'Flores, plantas, folhas' },
    { id: 'animal', icon: '🐾', nome: 'Animal', desc: 'Pets, bichos, insetos' },
    { id: 'old_school', icon: '🎨', nome: 'Old School', desc: 'Estilo clássico, bold' },
    { id: 'neo_tradicional', icon: '💥', nome: 'Neo Tradicional', desc: 'Cores vibrantes' },
    { id: 'blackwork', icon: '⬛', nome: 'Blackwork', desc: '100% preto, geométrico' },
    { id: 'camuflagem', icon: '🎨', nome: 'Camuflagem Cicatriz', desc: 'Cobertura com tinta' }
  ];

  const handleEstilo = (estilo) => {
    atualizarDados({ estilo: estilo.id, estilo_nome: estilo.nome });
    irParaTela(3);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>O que você quer tatuar?</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 1/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '12.5%' }}></div>
          </div>
        </div>

        {estilos.map((estilo) => (
          <div
            key={estilo.id}
            className={`card ${dados.estilo === estilo.id ? 'selecionado' : ''}`}
            onClick={() => handleEstilo(estilo)}
          >
            <div className="card-icon">{estilo.icon}</div>
            <div className="card-title">{estilo.nome}</div>
            <div className="card-desc">{estilo.desc}</div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Escolha um estilo para continuar</p>
      </div>
    </div>
  );
}
