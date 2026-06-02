export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { imagemBase64 } = req.body;

  if (!imagemBase64) {
    return res.status(400).json({ erro: 'Imagem não fornecida' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
                  text: `Você é um tatuador experiente especializado em Fine Line, Botânica, Pets e Neo Tradicional. 

Analise esta imagem de tatuagem/ideia de tatuagem e retorne APENAS um JSON com ESTES CAMPOS (sem markdown, sem explicações):

{
  "tipo": "fine_line" ou "flor" ou "animal" ou "old_school" ou "neo_tradicional" ou "blackwork" ou "camuflagem" ou "nome" ou "outro",
  "tamanho_estimado_cm": número entre 2 e 30,
  "complexidade": "baixa" ou "média" ou "alta",
  "descricao": "descrição breve do que vê (máximo 50 palavras)",
  "preco": número (preço em reais, entre 130 e 2000),
  "tempo_minutos": número (tempo estimado),
  "pode_fazer": true ou false,
  "observacoes": "observações curtas se houver"
}

Se for um desenho/referência simples, estude cores, detalhes e complexidade.
Se a imagem não for uma tatuagem, tente adivinhar qual seria o preço se fosse tatuada.
Sempre retorne APENAS JSON válido, nada mais.`,
                },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: imagemBase64,
                  },
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
      const jsonMatch = texto.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const analise = JSON.parse(jsonMatch[0]);
        return res.status(200).json(analise);
      }
    }

    return res.status(400).json({ erro: 'Não consegui analisar a imagem' });
  } catch (erro) {
    console.error('Erro Gemini:', erro);
    return res.status(500).json({ erro: 'Erro ao analisar imagem: ' + erro.message });
  }
}
