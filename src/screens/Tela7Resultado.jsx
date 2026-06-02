import { useState } from 'react';

export default function Tela7Resultado({ irParaTela, dados, atualizarDados }) {
  const [formaPaymentSelecionada, setFormaPaymentSelecionada] = useState('pix');

  // Cálculo simples de preço
  const precoBase = 300;
  const preco = Math.round(precoBase * (dados.tamanho / 10) * dados.multiplicador_cor);

  const taxasVISAMaster = {
    debito: 0.0135,
    vista: 0.0314,
    2: 0.0671, 3: 0.0839, 4: 0.0939, 5: 0.1039, 6: 0.1139,
    7: 0.1239, 8: 0.1261, 9: 0.1262, 10: 0.1263, 11: 0.1264, 12: 0.1265
  };

  const taxasEloOutras = {
    debito: 0.0264,
    vista: 0.0443,
    2: 0.0815, 3: 0.0983, 4: 0.1083, 5: 0.1183, 6: 0.1283,
    7: 0.1383, 8: 0.1405, 9: 0.1406, 10: 0.1422, 11: 0.1489, 12: 0.1494
  };

  const calcularComTaxa = (taxa) => Math.round(preco * (1 + taxa));
  
  const calcularParcelamento = (parcelas, bandeira) => {
    const taxas = bandeira === 'visa' ? taxasVISAMaster : taxasEloOutras;
    const taxa = taxas[parcelas] || 0;
    const valorTotal = calcularComTaxa(taxa);
    const valorParcela = Math.round(valorTotal / parcelas);
    return { valorTotal, valorParcela };
  };

  const proximaTela = () => {
    atualizarDados({ preco, forma_pagamento: formaPaymentSelecionada });
    irParaTela(dados.modo === 'upload' ? 8 : 9);
  };

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

        <div className="voltar" onClick={() => irParaTela(dados.modo === 'upload' ? 6 : 7)}>
          ← VOLTAR
        </div>

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

        <div className="resumo-valor">
          R$ {preco.toLocaleString('pt-BR')}
        </div>

        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>
            💳 SIMULE SEU PARCELAMENTO
          </p>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: '#1A1F71' }}>
              💳 VISA / MASTERCARD
            </p>
            
            <div style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '8px',
              borderLeft: '4px solid #1A1F71',
              cursor: 'pointer'
            }} onClick={() => setFormaPaymentSelecionada('debitoVisa')}>
              <p style={{ fontSize: '11px', marginBottom: '5px' }}>
                <strong>Débito:</strong> R$ {calcularComTaxa(taxasVISAMaster.debito).toLocaleString('pt-BR')} (1,35%)
              </p>
              <p style={{ fontSize: '10px', color: '#666' }}>Sem juros</p>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcelas) => {
              const key = parcelas === 1 ? 'vista' : parcelas;
              const { valorTotal, valorParcela } = calcularParcelamento(key, 'visa');
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

          <div style={{ borderTop: '2px solid #ddd', paddingTop: '15px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: '#800080' }}>
              💳 ELO / DEMAIS BANDEIRAS
            </p>
            
            <div style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '8px',
              borderLeft: '4px solid #800080',
              cursor: 'pointer'
            }} onClick={() => setFormaPaymentSelecionada('debitoElo')}>
              <p style={{ fontSize: '11px', marginBottom: '5px' }}>
                <strong>Débito:</strong> R$ {calcularComTaxa(taxasEloOutras.debito).toLocaleString('pt-BR')} (2,64%)
              </p>
              <p style={{ fontSize: '10px', color: '#666' }}>Sem juros</p>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((parcelas) => {
              const key = parcelas === 1 ? 'vista' : parcelas;
              const { valorTotal, valorParcela } = calcularParcelamento(key, 'elo');
              return (
                <div key={parcelas} style={{
                  background: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  borderLeft: '4px solid #800080',
                  cursor: 'pointer'
                }} onClick={() => setFormaPaymentSelecionada(`creditoElo${parcelas}x`)}>
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
        </div>

        <div style={{
          background: '#fffef0',
          padding: '15px',
          borderRadius: '8px',
          border: '2px solid #FFD700',
          marginBottom: '20px',
          cursor: 'pointer'
        }} onClick={() => setFormaPaymentSelecionada('pix')}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
            💰 PIX / DINHEIRO
          </p>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFD700' }}>
            R$ {preco.toLocaleString('pt-BR')}
          </p>
          <p style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
            Melhor preço! Sem juros
          </p>
        </div>

        <button className="btn-primario" onClick={proximaTela}>
          AGENDAR AGORA
        </button>
      </div>
    </div>
  );
}
