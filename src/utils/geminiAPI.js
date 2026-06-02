export const analisarImagemComGemini = async (imagemBase64) => {
  try {
    const response = await fetch('/api/analisarImagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imagemBase64 }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao analisar imagem');
    }

    return data;
  } catch (erro) {
    console.error('Erro ao analisar imagem:', erro);
    throw erro;
  }
};
