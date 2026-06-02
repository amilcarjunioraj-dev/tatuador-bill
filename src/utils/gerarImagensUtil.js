export const gerarImagens = async (descricao) => {
  try {
    const response = await fetch('/api/gerarImagens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descricao }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao gerar imagens');
    }

    return data;
  } catch (erro) {
    console.error('Erro:', erro);
    throw erro;
  }
};
