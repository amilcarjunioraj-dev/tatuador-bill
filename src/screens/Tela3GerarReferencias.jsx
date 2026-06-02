import { useState, useEffect, useCallback } from 'react';
import { buscarImagensTatuagem } from '../utils/unsplashAPI';

export default function Tela3GerarReferencias({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(true);
  const [imagens, setImagens] = useState([]);
  const [erro, setErro] = useState('');

  const carregarImagens = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const resultado = await buscarImagensTatuagem(dados.descricao_cliente);
      setImagens(resultado);
    } catch (e) {
      setErro('Erro ao carregar imagens: ' + e.message);
    }

    setLoading(false);
  }, [dados.descricao_cliente]);

  useEffect(() => {
    carregarImagens();
  }, [carregarImagens]);
