export default function Tela7Agendamento({ irParaTela, dados, atualizarDados }) {
  // Gerar próximas datas (seg/ter/sex/sab)
  const gerarDatas = () => {
    const datas = [];
    const diasValidos = [1, 2, 5, 6]; // seg=1, ter=2, sex=5, sab=6
    let dataAtual = new Date();
    
    while (datas.length < 12) {
      if (diasValidos.includes(dataAtual.getDay())) {
        datas.push(new Date(dataAtual));
      }
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
    return datas;
  };

  const datas = gerarDatas();
  const tempo = dados.tempo_estimado || 60;

  // Determinar horários disponíveis
  const getHorarios = () => {
    if (tempo > 180) {
      // Trabalho grande (> 3h) - só 10h
      return ['10:00'];
    } else if (tempo > 60) {
      // Trabalho médio - só 10h
      return ['10:00'];
    } else {
      // Trabalho pequeno - 10h e 14h
      return ['10:00', '14:00'];
    }
  };

  const horariosDisponiveis = getHorarios();

  const formatarData = (date) => {
    const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    return `${dias[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]}`;
  };

  const calcularFim = (hora) => {
    const [h] = hora.split(':').map(Number);
    const minutos = tempo % 60;
    const horas = Math.floor(tempo / 60);
    const fimHora = h + horas;
    const fimMin = minutos > 0 ? minutos : 0;
    return `${String(fimHora).padStart(2, '0')}:${String(fimMin).padStart(2, '0')}`;
  };

  const handleAgendamento = (data, hora) => {
    const dataFormatada = formatarData(data);
    atualizarDados({ 
      dia: dataFormatada,
      hora: hora,
      data_obj: data
    });
    irParaTela(8);
  };

  return (
    <div className="tela">
      <div className="header">
        <h2>Escolha seu dia</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 6/8
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(6)}>
          ← VOLTAR
        </div>

        <div style={{ 
          background: '#fffef0', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '2px solid #FFD700'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
            ⏱️ Tempo estimado: {dados.tempo_estimado} minutos
          </p>
          {tempo > 180 && (
            <p style={{ fontSize: '12px', color: '#666' }}>
              📌 Trabalho grande! Você só pode agendar às 10:00 para ficar o dia todo 🎨
            </p>
          )}
          {tempo > 60 && tempo <= 180 && (
            <p style={{ fontSize: '12px', color: '#666' }}>
              📌 Trabalho médio! Melhor às 10:00, mas 14:00 também cabe
            </p>
          )}
        </div>

        {datas.map((data, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: '#FFD700',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              {formatarData(data)}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {horariosDisponiveis.map((hora) => (
                <div
                  key={hora}
                  className={`horario-card ${dados.hora === hora && dados.data_obj && formatarData(dados.data_obj) === formatarData(data) ? 'selecionado' : ''}`}
                  onClick={() => handleAgendamento(data, hora)}
                >
                  <div className="horario-hora" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {hora}
                  </div>
                  <div className="horario-hora" style={{ fontSize: '11px', marginTop: '5px' }}>
                    até {calcularFim(hora)}
                  </div>
                  <div className="horario-hora" style={{ fontSize: '10px', marginTop: '5px', color: '#00aa00' }}>
                    ✓ Disponível
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
