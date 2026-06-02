export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  return (
    <div className="tela">
      <div className="header">
        <h2>Escolha uma opção</h2>
      </div>

      <div className="container">
        <p style={{ marginBottom: '20px' }}>Sua descrição: {dados.descricao_cliente}</p>

        <button 
          className="btn-primario"
          onClick={() => {
            atualizarDados({ referencia_escolhida: 1 });
            irParaTela(5);
          }}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          ✍️ Opção 1
        </button>

        <button 
          className="btn-primario"
          onClick={() => {
            atualizarDados({ referencia_escolhida: 2 });
            irParaTela(5);
          }}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          ✍️ Opção 2
        </button>

        <button 
          className="btn-primario"
          onClick={() => {
            atualizarDados({ referencia_escolhida: 3 });
            irParaTela(5);
          }}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          ✍️ Opção 3
        </button>

        <button 
          className="btn-primario"
          onClick={() => {
            atualizarDados({ referencia_escolhida: 4 });
            irParaTela(5);
          }}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          ✍️ Opção 4
        </button>
      </div>
    </div>
  );
}
