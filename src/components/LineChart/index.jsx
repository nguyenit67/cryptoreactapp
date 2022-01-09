import { Line as ChartLine } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

function LineChart({ coinHistory: coinHistoryData, currentPrice, coinName }) {
  const historyOfCoin = coinHistoryData?.data?.history;

  const coinPrice = historyOfCoin?.map((item) => item.price);
  const coinTimeStamp = historyOfCoin?.map((item) =>
    new Date(item.timestamp).toLocaleDateString()
  );

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistoryData?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
        <ChartLine data={data} options={options} />
      </Row>
    </>
  );
}

export default LineChart;
