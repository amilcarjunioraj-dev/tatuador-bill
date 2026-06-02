import React, { useState } from 'react';
import './App.css';
import Tela1Home from './screens/Tela1Home';
import Tela2Estilo from './screens/Tela2Estilo';
import Tela3Tamanho from './screens/Tela3Tamanho';
import Tela4Cor from './screens/Tela4Cor';
import Tela5Local from './screens/Tela5Local';
import Tela6Resultado from './screens/Tela6Resultado';
import Tela7Agendamento from './screens/Tela7Agendamento';
import Tela8Confirmacao from './screens/Tela8Confirmacao';

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
      {tela === 1 && <Tela1Home irParaTela={irParaTela} />}
      {tela === 2 && <Tela2Estilo irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 3 && <Tela3Tamanho irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 4 && <Tela4Cor irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 5 && <Tela5Local irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 6 && <Tela6Resultado irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 7 && <Tela7Agendamento irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 8 && <Tela8Confirmacao dados={dados} irParaTela={irParaTela} />}
    </div>
  );
}

export default App;
