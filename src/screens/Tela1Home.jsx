export default function Tela1_Home({ irParaTela }) {
  return (
    <div className="tela">
      <div className="header">
        <div className="logo">💎</div>
        <h1>ORÇADOR DE TATUAGENS</h1>
        <p>Tatuador Bill - Nova Iguaçu, RJ</p>
      </div>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#000' }}>
            Tatuador Bill
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            ✨ Fine Line | 🌸 Botânica | 🐾 Pets | 💥 Neo Tradicional
          </p>
        </div>

        <div style={{
          background: '#000',
          color: '#FFD700',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            Descubra quanto custa sua tatuagem dos sonhos!
          </p>
          <button
            className="btn-primario"
            onClick={() => irParaTela(2)}
          >
            CALCULAR ORÇAMENTO ✨
          </button>
        </div>

        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ marginBottom: '10px' }}>✅ Valores precisos</p>
          <p style={{ marginBottom: '10px' }}>✅ Pagamento flexível</p>
          <p>✅ Agendamento rápido</p>
        </div>

        <div style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
          <p>📍 Nova Iguaçu, RJ</p>
          <p>📞 (21) 96496-4884</p>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
      </div>

      <div className="footer">
        <p>© 2024 Tatuador Bill - Todos os direitos reservados</p>
      </div>
    </div>
  );
}
