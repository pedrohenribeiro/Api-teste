import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AreaCharts.scss";

const AreaProgressChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dados_itens');
      const data = response.data;
      setChartData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Itens Mais Vendidos</h4>
      </div>
      <div className="progress-bar-list">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          chartData.length > 0 ? (
            chartData.map((item) => (
              <div className="progress-bar-item" key={item.id}>
                <div className="bar-item-info">
                  <p className="bar-item-info-name">{item.Produto}</p>
                  <p className="bar-item-info-value">
                    {item.quantidade_vendida}
                  </p>
                </div>
                <div className="bar-item-full">
                  <div
                    className="bar-item-filled"
                    style={{
                      width: `${item.quantidade_vendida}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p>Não há dados disponíveis.</p>
          )
        )}
      </div>
    </div>
  );
};

export default AreaProgressChart;
