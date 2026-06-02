export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ erro: 'Descrição não fornecida' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const prompts = [
      `Crie uma imagem de referência para tatuagem com o seguinte estilo: ${descricao}. 
      Estilo A: Minimalista, traços finos, elegante. 
      Qualidade alta, png, fundo transparente.`,
      
      `Crie uma imagem de referência para tatuagem com o seguinte estilo: ${descricao}. 
      Estilo B: Mais detalhado, com mais elementos, complexo. 
      Qualidade alta, png, fundo transparente.`,
      
      `Crie uma imagem de referência para tatuagem com o seguinte estilo: ${descricao}. 
      Estilo C: Geométrico, linhas precisas, moderno. 
      Qualidade alta, png, fundo transparente.`,
      
      `Crie uma imagem de referência para tatuagem com o seguinte estilo: ${descricao}. 
      Estilo D: Realista, com sombreado, natural. 
      Qualidade alta, png, fundo transparente.`
    ];

    const imagens = [];

    for (let i = 0; i < prompts.length; i++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompts[i],
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        if (data.candidates && data.candidates[0]) {
          const texto = data.candidates[0].content.parts[0].text;
          imagens.push({
            numero: i + 1,
            descricao: `Variação ${String.fromCharCode(64 + i + 1)}`,
            status: 'gerada',
            prompt_usado: prompts[i]
          });
        }
      } catch (err) {
        console.error(`Erro ao gerar imagem ${i + 1}:`, err);
        imagens.push({
          numero: i + 1,
          descricao: `Variação ${String.fromCharCode(64 + i + 1)}`,
          status: 'erro',
          erro: err.message
        });
      }
    }

    return res.status(200).json({ 
      sucesso: true,
      imagens: imagens,
      descricao_original: descricao
    });
  } catch (erro) {
    console.error('Erro ao gerar imagens:', erro);
    return res.status(500).json({ erro: 'Erro ao gerar imagens: ' + erro.message });
  }
}
