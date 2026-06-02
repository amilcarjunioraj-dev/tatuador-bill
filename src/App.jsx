import React, { useState } from 'react';
import './App.css';
import Tela1Home from './screens/Tela1Home';
import Tela2Home from './screens/Tela2Home';
import Tela2Descricao from './screens/Tela2Descricao';
import Tela2Upload from './screens/Tela2Upload';
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
    modo: '', // 'upload' ou 'descrever'
    descricao_cliente: '',
    referencia_escolhida: 0,
    referencia_descricao: '',
    tamanho: 8,
    cor: '',
    cor_nome: '',
    multiplicador_cor: 1.0,
    local: '',
    local_nome: '',
    preco: 0,
    forma_pagamento: 'pix',
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
      {/* TELA 1: HOME */}
      {tela === 1 && <Tela1Home irParaTela={irParaTela} />}
      
      {/* TELA 2: ESCOLHER UPLOAD OU DESCREVER */}
      {tela === 2 && <Tela2Home irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {/* ===== FLUXO UPLOAD ===== */}
      {tela === 3 && dados.modo === 'upload' && <Tela2Upload irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 4 && dados.modo === 'upload' && <Tela4Tamanho irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 5 && dados.modo === 'upload' && <Tela5Cor irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 6 && dados.modo === 'upload' && <Tela6Local irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 7 && dados.modo === 'upload' && <Tela7Resultado irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 8 && dados.modo === 'upload' && <Tela7Agendamento irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 9 && dados.modo === 'upload' && <Tela9Confirmacao dados={dados} irParaTela={irParaTela} />}
      
      {/* ===== FLUXO DESCREVER ===== */}
      {tela === 3 && dados.modo === 'descrever' && <Tela2Descricao irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 4 && dados.modo === 'descrever' && <Tela3GerarReferencias irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 5 && dados.modo === 'descrever' && <Tela4Tamanho irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 6 && dados.modo === 'descrever' && <Tela5Cor irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 7 && dados.modo === 'descrever' && <Tela6Local irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 8 && dados.modo === 'descrever' && <Tela7Resultado irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 9 && dados.modo === 'descrever' && <Tela7Agendamento irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      {tela === 10 && dados.modo === 'descrever' && <Tela9Confirmacao dados={dados} irParaTela={irParaTela} />}
    </div>
  );
}

export default App;
