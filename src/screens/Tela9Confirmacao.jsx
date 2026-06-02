export default function Tela9_Confirmacao({ dados, irParaTela }) {
  const whatsappBill = '5521964964884';

  const gerarMensagemWhatsApp = () => {
    const mensagem = `Oi Bill! Gostaria de agendar minha tatuagem:

✨ ${dados.estilo_nome}
📏 ${dados.tamanho} cm
🎨 ${dados.cor_nome}
📍 ${dados.local_nome}
💰 R$ ${dados.preco?.toLocaleString('pt-BR')}

📅 ${dados.dia}
🕐 ${dados.hora}
⏱️ Tempo estimado: ${dados.tempo_estimado} minutos

👤 Nome: ${dados.nome}
📱 WhatsApp: ${dados.whatsapp}
📧 Email: ${dados.email || 'Não informado'}

Confirma para mim? 🙏`;

    return encodeURIComponent(mensagem);
  };

  const linkWhatsApp = `https://wa.me/${whatsappBill}?text=${gerarMensagemWhatsApp()}`;

  const handleNovoOrcamento = () => {
    localStorage.removeItem('orcamento_bill');
    irParaTela(1);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Confirmação</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 8/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(7)}>
          ← VOLTAR
        </div>

        {/* SUCESSO */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          background: '#fffef0',
          borderRadius: '8px',
          border: '2px solid #FFD700'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            Orçamento Pronto!
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Seus dados foram salvos. Agora é só confirmar com Bill no WhatsApp!
          </p>
        </div>

        {/* RESUMO FINAL */}
        <div className="resumo">
          <div className="resumo-item">
            <span>Estilo:</span>
            <strong>{dados.estilo_nome}</strong>
          </div>
          <div className="resumo-item">
            <span>Tamanho:</span>
            <strong>{dados.tamanho} cm</strong>
          </div>
          <div className="resumo-item">
            <span>Cor:</span>
            <strong>{dados.cor_nome}</strong>
          </div>
          <div className="resumo-item">
            <span>Local:</span>
            <strong>{dados.local_nome}</strong>
          </div>
          <div className="resumo-item">
            <span>Valor:</span>
            <strong>R$ {dados.preco?.toLocaleString('pt-BR')}</strong>
          </div>
          <div className="resumo-item">
            <span>Data:</span>
            <strong>{dados.dia}</strong>
          </div>
          <div className="resumo-item">
            <span>Horário:</span>
            <strong>{dados.hora}</strong>
          </div>
          <div className="resumo-item">
            <span>Tempo est.:</span>
            <strong>{dados.tempo_estimado} min</strong>
          </div>
        </div>

        {/* DADOS PESSOAIS */}
        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
            👤 Seus dados:
          </p>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>
            <strong>Nome:</strong> {dados.nome}
          </p>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>
            <strong>WhatsApp:</strong> {dados.whatsapp}
          </p>
          {dados.email && (
            <p style={{ fontSize: '12px' }}>
              <strong>Email:</strong> {dados.email}
            </p>
          )}
        </div>

        {/* AVISO IMPORTANTE */}
        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            📌 IMPORTANTE:
          </p>
          <ul style={{ fontSize: '11px', marginLeft: '20px', color: '#666' }}>
            <li>✓ Este orçamento é válido por 30 dias</li>
            <li>✓ Confirme com Bill no WhatsApp para garantir seu horário</li>
            <li>✓ O endereço será enviado após confirmação</li>
            <li>✓ Leve identificação no dia da tatuagem</li>
          </ul>
        </div>

        {/* BOTÃO WHATSAPP */}
        <a 
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button className="btn-primario">
            📱 CONFIRMAR NO WHATSAPP
          </button>
        </a>

        {/* BOTÃO NOVO ORÇAMENTO */}
        <button 
          className="btn-secundario"
          onClick={handleNovoOrcamento}
        >
          ↻ NOVO ORÇAMENTO
        </button>

        {/* MENSAGEM PREVIEW */}
        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>
            📨 Sua mensagem será:
          </p>
          <div style={{
            background: '#fff',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '10px',
            color: '#333',
            maxHeight: '150px',
            overflow: 'auto',
            border: '1px solid #ddd',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {`Oi Bill! Gostaria de agendar minha tatuagem:

✨ ${dados.estilo_nome}
📏 ${dados.tamanho} cm
🎨 ${dados.cor_nome}
📍 ${dados.local_nome}
💰 R$ ${dados.preco?.toLocaleString('pt-BR')}

📅 ${dados.dia}
🕐 ${dados.hora}
⏱️ Tempo estimado: ${dados.tempo_estimado} minutos

👤 Nome: ${dados.nome}
📱 WhatsApp: ${dados.whatsapp}
📧 Email: ${dados.email || 'Não informado'}

Confirma para mim? 🙏`}
          </div>
        </div>
      </div>

      <div className="footer">
        <p>💎 Obrigado por escolher Tatuador Bill! 💎</p>
      </div>
    </div>
  );
}
