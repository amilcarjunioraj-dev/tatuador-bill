// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const carregarImagens = async () => {
      setLoading(true);
      setErro('');

      try {
        const resultado = await gerarImagensDalleE(dados.descricao_cliente);
        setImagens(resultado);
      } catch (e) {
        setErro('Erro ao gerar imagens: ' + e.message);
      }

      setLoading(false);
    };

    carregarImagens();
  }, [dados.descricao_cliente]); // ← Mudou aqui!
