import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

export default function CotacaoForm() {
  const { data, error, isLoading } = useSWR(
    'https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=20240101&end_date=20241231',
    fetcher,
    { refreshInterval: 60000 } // atualiza a cada 60 segundos
  );

  if (error) return <div>Erro ao carregar os dados da cotação histórica.</div>;
  if (isLoading || !data) return <div>Carregando dados...</div>;

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Histórico de Cotação do Dólar (USD/BRL)</h1>
      <p>Total de registros: {data.length}</p>
      <table border="1" cellPadding="8" style={{ marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Compra (bid)</th>
            <th>Venda (ask)</th>
            <th>Alta</th>
            <th>Baixa</th>
            <th>Variação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cotacao) => (
            <tr key={cotacao.timestamp}>
              <td>{new Date(Number(cotacao.timestamp) * 1000).toLocaleDateString()}</td>
              <td>R$ {cotacao.bid}</td>
              <td>R$ {cotacao.ask}</td>
              <td>R$ {cotacao.high}</td>
              <td>R$ {cotacao.low}</td>
              <td>{cotacao.pctChange}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
