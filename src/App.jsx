import React, { useState } from 'react';
import './App.css';
import Tela1Home from './screens/Tela1Home';
import Tela2Home from './screens/Tela2Home';
import Tela2Descricao from './screens/Tela2Descricao';
import Tela3GerarReferencias from './screens/Tela3GerarReferencias';
import Tela4Tamanho from './screens/Tela4Tamanho';
import Tela5Cor from './screens/Tela5Cor';
import Tela6Local from './screens/Tela6Local';
import Tela7Resultado from './screens/Tela7Resultado';
import Tela7Agendamento from './screens/Tela7Agendamento';
import Tela9Confirmacao from './screens/Tela9Confirmacao';

function App() {
  const [tela, setTela] = useState(1);
  const [dados, setDados] = useState({
    modo: '',
    descricao_cliente: '',
    tamanho: 8,
    cor: '',
    cor_nome: '',
    multiplicador_cor: 1.0,
    local: '',
    local_nome: '',
    preco: 0,
  });

  const atualizarDados = (novosDados) => {
    setDados({ ...dados, ...novosDados });
  };

  const irParaTela = (numeroTela) => {
    setTela(numeroTela);
    window.scrollTo(0, 0);
  };

  console.log('Tela atual:', tela, 'Modo:', dados.modo);

  return (
    <div className="app">
      {tela === 1 && <Tela1Home irParaTela={irParaTela} />}
      
      {tela === 2 && <Tela2Home irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 3 && dados.modo === 'descrever' && <Tela2Descricao irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 4 && dados.modo === 'descrever' && <Tela3GerarReferencias irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 5 && <Tela4Tamanho irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 6 && <Tela5Cor irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 7 && <Tela6Local irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 8 && <Tela7Resultado irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 9 && <Tela7Agendamento irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 10 && <Tela9Confirmacao dados={dados} irParaTela={irParaTela} />}
    </div>
  );
}

export default App;
