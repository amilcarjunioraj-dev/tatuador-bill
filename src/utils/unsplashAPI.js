export const buscarImagensTatuagem = async (descricao) => {
  const accessKey = process.env.REACT_APP_UNSPLASH_KEY;

  if (!accessKey) {
    throw new Error('Chave Unsplash não configurada');
  }

  const prompts = [
    `${descricao} minimalist tattoo`,
    `${descricao} delicate tattoo`,
    `${descricao} geometric tattoo`,
    `${descricao} fine line tattoo`
  ];

  try {
    const imagens = await Promise.all(
      prompts.map(async (prompt, index) => {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&client_id=${accessKey}&per_page=1&orientation=portrait`,
          {
            headers: {
              'Accept-Version': 'v1'
            }
          }
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const img = data.results[0];
          return {
            numero: index + 1,
            url: img.urls.small,
            autor: img.user.name,
            descricao: ['Minimalista', 'Delicada', 'Geométrica', 'Fine Line'][index]
          };
        }

        return {
          numero: index + 1,
          url: null,
          autor: 'Sem imagem',
          descricao: ['Minimalista', 'Delicada', 'Geométrica', 'Fine Line'][index]
        };
      })
    );

    return imagens;
  } catch (erro) {
    console.error('Erro ao buscar imagens:', erro);
    throw erro;
  }
};
