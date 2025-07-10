import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

const themeClaro = createTheme({
  palette: {
    mode: 'light', // força tema claro
  },
});

export default function CotacaoForm() {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [cotacoes, setCotacoes] = useState([]);

  const formatarData = (data) => {
    if (!data) return '';
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}${mes}${dia}`;
  };

  const buscarCotacao = async () => {
    if (!dataInicio || !dataFim) {
      alert('Selecione as duas datas!');
      return;
    }

    const inicio = formatarData(dataInicio);
    const fim = formatarData(dataFim);

    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${inicio}&end_date=${fim}`;

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      setCotacoes(dados);
    } catch (erro) {
      console.error('Erro ao buscar cotações:', erro);
      alert('Erro ao buscar dados. Veja o console.');
    }
  };

  return (
    <ThemeProvider theme={themeClaro}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ p: 3, fontFamily: 'Arial' }}>
          <h2>Buscar Cotação USD/BRL</h2>

          <DatePicker
            label="Data Início"
            value={dataInicio}
            onChange={(newValue) => setDataInicio(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ m: 1 }} />}
          />

          <DatePicker
            label="Data Fim"
            value={dataFim}
            onChange={(newValue) => setDataFim(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ m: 1 }} />}
          />

          <Button variant="contained" onClick={buscarCotacao} sx={{ m: 1 }}>
            Buscar
          </Button>

          {cotacoes.length > 0 && (
            <Box mt={2}>
              <h3>Resultados:</h3>
              {cotacoes.map((item, index) => (
                <Box key={index} sx={{ mb: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                  <div><strong>Data:</strong> {new Date(item.timestamp * 1000).toLocaleDateString()}</div>
                  <div><strong>Compra:</strong> R$ {item.bid}</div>
                  <div><strong>Venda:</strong> R$ {item.ask}</div>
                  <div><strong>Alta:</strong> R$ {item.high}</div>
                  <div><strong>Baixa:</strong> R$ {item.low}</div>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

