import React, { useState } from 'react';
import './App.css';
import Tela1Home from './screens/Tela1Home';
import Tela2Home from './screens/Tela2Home';
import Tela2Estilo from './screens/Tela2Estilo';
import Tela2Upload from './screens/Tela2Upload';
import Tela3Tamanho from './screens/Tela3Tamanho';
import Tela4Cor from './screens/Tela4Cor';
import Tela5Local from './screens/Tela5Local';
import Tela6Resultado from './screens/Tela6Resultado';
import Tela7Agendamento from './screens/Tela7Agendamento';
import Tela8Confirmacao from './screens/Tela8Confirmacao';

function App() {
  const [tela, setTela] = useState(1);
  const [dados, setDados] = useState({
    modo: '', // 'upload' ou 'manual'
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
    preco: 0,
    tempo_estimado: 0,
    imagem_analisada: false,
    descricao_ia: '',
    observacoes_ia: '',
    pode_fazer: true,
    complexidade: '',
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
      
      {tela === 2 && <Tela2Home irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 3 && dados.modo === 'upload' && <Tela2Upload irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 3 && dados.modo === 'manual' && <Tela2Estilo irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 4 && <Tela3Tamanho irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 5 && <Tela4Cor irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 6 && <Tela5Local irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 7 && <Tela6Resultado irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 8 && <Tela7Agendamento irParaTela={irParaTela} dados={dados} atualizarDados={atualizarDados} />}
      
      {tela === 9 && <Tela8Confirmacao dados={dados} irParaTela={irParaTela} />}
    </div>
  );
}

export default App;
