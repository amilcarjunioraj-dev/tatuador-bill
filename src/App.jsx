import React, { useState } from 'react';
import './App.css';
import Tela1_Home from './screens/Tela1_Home';
import Tela2_Estilo from './screens/Tela2_Estilo';
import Tela3_Tamanho from './screens/Tela3_Tamanho';
import Tela4_Cor from './screens/Tela4_Cor';
import Tela5_Local from './screens/Tela5_Local';
import Tela6_Resultado from './screens/Tela6_Resultado';
import Tela7_Agendamento from './screens/Tela7_Agendamento';
import Tela8_Confirmacao from './screens/Tela8_Confirmacao';

function App() {
  const [tela, setTela] = useState(1);
  const [dados, setDados] = useState({
    estilo: '',
    estilo_nome: '',
    tamanho: 8,
    cor: '',
    cor_nome: '',
    local: '',
    local_nome: '',
    nome: '',
    whatsapp: '',
    email: '',
    dia: '',
    hora: '',
  });

  const atualizarDados = (novosDados) => {
    const dadosAtualizados = { ...dados, ...novosDados };
    setDados(dadosAtualizados);
    localStorage.setItem('orcamento_bill', JSON.stringify(dadosAtualizados));
  };

  const irParaTela = (numeroTela) => {
    setTela(numeroTela);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      {tela === 1 && <Tela1_Home irParaTela={irParaTela} />}
      {tela === 2 && <Tela2_Estilo irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 3 && <Tela3_Tamanho irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 4 && <Tela4_Cor irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 5 && <Tela5_Local irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 6 && <Tela6_Resultado irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 7 && <Tela7_Agendamento irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 8 && <Tela8_Confirmacao dados={dados} irParaTela={irParaTela} />}
    </div>
  );
}

export default App;
