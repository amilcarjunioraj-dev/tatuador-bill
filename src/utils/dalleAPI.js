export const gerarImagensDalleE = async (descricao) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Chave OpenAI não configurada');
  }

  const prompts = [
    `Tatuagem: ${descricao}. Estilo minimalista, traços finos, elegante, profissional, referência para tatuador.`,
    `Tatuagem: ${descricao}. Estilo delicado, linhas suaves, gracioso, referência para tatuador.`,
    `Tatuagem: ${descricao}. Estilo geométrico, linhas precisas, moderno, referência para tatuador.`,
    `Tatuagem: ${descricao}. Estilo clássico, detalhado, tradicional, referência para tatuador.`
  ];

  try {
    const imagens = await Promise.all(
      prompts.map(async (prompt, index) => {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard'
          })
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          return {
            numero: index + 1,
            url: data.data[0].url,
            descricao: ['Minimalista', 'Delicada', 'Geométrica', 'Clássica'][index]
          };
        }

        if (data.error) {
          throw new Error(data.error.message);
        }

        return {
          numero: index + 1,
          url: null,
          descricao: ['Minimalista', 'Delicada', 'Geométrica', 'Clássica'][index],
          erro: 'Erro ao gerar'
        };
      })
    );

    return imagens;
  } catch (erro) {
    console.error('Erro DALL-E:', erro);
    throw erro;
  }
};
