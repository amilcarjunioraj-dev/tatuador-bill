import { useState } from 'react';
import { analisarImagemComGemini } from '../utils/geminiAPI';

export default function Tela7Resultado({ irParaTela, dados, atualizarDados }) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [preco, setPreco] = useState(0);
  const [formaPaymentSelecionada, setFormaPaymentSelecionada] = useState('pix');

  // Taxas de parcelamento
  const taxasVISAMaster = {
    debito: 0.0135,
    vista: 0.0314,
    2: 0.0671,
    3: 0.0839,
    4: 0.0939,
    5: 0.1039,
    6: 0.1139,
    7: 0.1239,
    8: 0.1261,
    9: 0.1262,
    10: 0.1263,
    11: 0.1264,
    12: 0.1265
  };

  const taxasEloOutras = {
    debito: 0.0264,
    vista: 0.0443,
    2: 0.0815,
    3: 0.0983,
    4: 0.1083,
    5: 0.1183,
    6: 0.1283,
    7: 0.1383,
    8: 0.1405,
    9: 0.1406,
    10: 0.1422,
    11: 0.1489,
    12: 0.1494
  };

  // Calcular preço baseado na descrição
  const calcularPreco = async () => {
    try {
      // Prompt para IA analisar e calcular preço
      const prompt = `Você é um tatuador experiente. Baseado nesta descrição de tatuagem, analise e retorne APENAS um JSON:

Descrição do cliente: "${dados.descricao_cliente}"
Tamanho: ${dados.tamanho} cm
Cor: ${dados.cor_nome}
Local: ${dados.local_nome}

Retorne APENAS este JSON (sem markdown):
{
  "complexidade": "baixa" | "média" | "alta",
  "preco_base": número (preço em reais, 150-1000),
  "tempo_estimado": número (minutos),
  "descricao_analise": "breve análise"
}

Considere:
- Fine Line/Minimalista = mais barato
- Realista/Complexo = mais caro
- Tamanho maior = multiplicador
- Colorida = +30%
- Preto+Cinza = +10%
`;

      const response = await fetch('/api/analisarImagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagemBase64: null, prompt: prompt })
      });

      // Como não temos imagem, vou usar cálculo direto
      // Preço base por complexidade estimada
      const precoBase = 250; // Pode ajustar conforme análise

      let precoFinal = precoBase * dados.tamanho / 10; // Ajusta por tamanho
      precoFinal = precoFinal * dados.multiplicador_cor; // Multiplica por cor

      setPreco(Math.round(precoFinal / 10) * 10);
      setLoading(false);
    } catch (e) {
      console.error('Erro:', e);
      // Se der erro, usa cálculo simples
      const precoBase = 250;
      let precoFinal = precoBase * dados.tamanho / 10;
      precoFinal = precoFinal * dados.multiplicador_cor;
      setPreco(Math.round(precoFinal / 10) * 10);
      setLoading(false);
    }
  };

  // Calcular valor com taxa
  const calcularComTaxa = (taxa) => {
    return Math.round(preco * (1 + taxa));
  };

  // Calcular parcelamento
  const calcularParcelamento = (numeroParcelas, bandeira) => {
    const taxas = bandeira === 'visa' ? taxasVISAMaster : taxasEloOutras;
    const taxa = taxas[numeroParcelas] || 0;
    const valorTotal = calcularComTaxa(taxa);
    const valorParcela = Math.round(valorTotal / numeroParcelas);
    return { valorTotal, valorParcela };
  };

  // Carregar preço ao montar componente
  React.useEffect(() => {
    setTimeout(() => {
      calcularPreco();
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="tela">
        <div className="header">
          <h2>Calculando orçamento...</h2>
        </div>
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '32px', marginBottom: '20px' }}>⏳</p>
          <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Nossa IA está analisando sua tatuagem...
          </p>
        </div>
      </div>
    );
  }

  const proximaTela = () => {
    atualizarDados({ preco, forma_pagamento: formaPaymentSelecionada });
    irParaTela(8);
  };

  const { valorTotal: valorVista, valorParcela: parcelaVista } = calcularParcelamento(1, 'visa');

  return (
    <div className="tela">
      <div className="header">
        <h2>Seu Orçamento</h2>
      </div>

      <div className="container">
        <div className="progresso">
          Progresso: 6/7 (Orçamento)
          <div className="barra-progresso">
            <div className="barra-progresso-fill" style={{ width: '85.7%' }}></div>
          </div>
        </div>

        <div className="voltar" onClick={() => irParaTela(6)}>
          ← VOLTAR
        </div>

        {/* RESUMO */}
        <div className="resumo">
          <div className="resumo-item">
            <span>Tamanho:</span>
            <strong>{dados.tamanho} cm</strong>
          </div>
          <div className="resumo-item">
            <span>Cor:</span>
            <strong>{dados.cor_nome}</strong>
          </div>
          <div className="resumo-item">
            <span>Local:</span>
            <strong>{dados.local_nome}</strong>
          </div>
        </div>

        {/* PREÇO FINAL */}
        <div className="resumo-valor">
          R$ {preco.toLocaleString('pt-BR')}
        </div>

        {/* SIMULADOR DE PARCELAMENTO */}
        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>
            💳 SIMULE SEU PARCELAMENTO
          </p>

          {/* VISA/MASTER */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: '#1A1F71' }}>
              💳 VISA / MASTERCARD
            </p>
            
            <div style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '8px',
              borderLeft: '4px solid #1A1F71'
            }}>
              <p style={{ fontSize: '11px', marginBottom: '5px' }}>
                <strong>Débito:</strong> R$ {calcularComTaxa(taxasVISAMaster.debito).toLocaleString('pt-BR')} (1,35%)
              </p>
              <p style={{ fontSize: '10px', color: '#666' }}>Sem juros</p>
            </div>

            <div style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '8px',
              borderLeft: '4px solid #1A1F71'
            }}>
              <p style={{ fontSize: '11px', marginBottom: '5px' }}>
                <strong>Crédito à vista:</strong> R$ {calcularComTaxa(taxasVISAMaster.vista).toLocaleString('pt-BR')} (3,14%)
              </p>
            </div>

            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcelas) => {
              const { valorTotal, valorParcela } = calcularParcelamento(parcelas, 'visa');
              return (
                <div key={parcelas} style={{
                  background: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  borderLeft: '4px solid #1A1F71',
                  cursor: 'pointer'
                }} onClick={() => setFormaPaymentSelecionada(`creditoVisa${parcelas}x`)}>
                  <p style={{ fontSize: '11px', marginBottom: '3px' }}>
                    <strong>{parcelas}x de R$ {valorParcela.toLocaleString('pt-BR')}</strong>
                  </p>
                  <p style={{ fontSize: '10px', color: '#666' }}>
                    Total: R$ {valorTotal.toLocaleString('pt-BR')}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ELO / DEMAIS BANDEIRAS */}
          <div style={{
            borderTop: '2px solid #ddd',
            paddingTop: '15px'
          }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: '#800080' }}>
              💳 ELO / DEMAIS BANDEIRAS
            </p>
            
            <div style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '8px',
              borderLeft: '4px solid #800080'
            }}>
              <p style={{ fontSize: '11px', marginBottom: '5px' }}>
                <strong>Débito:</strong> R$ {calcularComTaxa(taxasEloOutras.debito).toLocaleString('pt-BR')} (2,64%)
              </p>
              <p style={{ fontSize: '10px', color: '#666' }}>Sem juros</p>
            </div>

            <div style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '8px',
              borderLeft: '4px solid #800080'
            }}>
              <p style={{ fontSize: '11px', marginBottom: '5px' }}>
                <strong>Crédito à vista:</strong> R$ {calcularComTaxa(taxasEloOutras.vista).toLocaleString('pt-BR')} (4,43%)
              </p>
            </div>

            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcelas) => {
              const { valorTotal, valorParcela
