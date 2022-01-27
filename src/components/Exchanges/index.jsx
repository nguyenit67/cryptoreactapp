import { Avatar, Image, Progress, Table, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { useGetExchangesQuery } from 'src/services/exchangeAPI';

const { Text, Title } = Typography;

Exchanges.propTypes = {};

function Exchanges() {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangeList = data?.map((exchange) => ({
    ...exchange,
    key: exchange.id,
  }));

  if (isFetching) return 'Loading...';

  console.log(exchangeList);

  // console.log(`Row ${index} of marketShare.render()`, { record });

  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        Top Cryptocurrency Exchanges Ranking by Trust Score
        <Title level={5} style={{ textAlign: 'center' }}>
          {'* Read the '}
          <a
            href="https://blog.coingecko.com/trust-score-explained/"
            target="_blank"
          >
            methodology
          </a>
        </Title>
      </Title>
      <Table
        sticky
        bordered
        dataSource={exchangeList}
        expandable={{
          expandRowByClick: true,
          showExpandColumn: false,
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        pagination={{
          pageSize: 100,
          position: ['bottomCenter'],
        }}
        sortDirections={['descend', 'ascend']}
        // columns declaration
        columns={[
          {
            title: '#',
            dataIndex: 'trust_score_rank',
            key: 'trust_score_rank',
            width: 80,

            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => a.trust_score_rank - b.trust_score_rank,
          },

          {
            title: 'Exchange',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
              <>
                <Avatar
                  className="exchange-image"
                  shape="square"
                  size={34}
                  src={record.image}
                />
                <Text>{record.name}</Text>
              </>
            ),

            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase()
                ? -1
                : a.name.toLowerCase() > b.name.toLowerCase()
                ? 1
                : 0,
          },

          {
            title: 'Trust Score',
            dataIndex: 'trust_score',
            key: 'trust_score',
            // width: 'fit-content',

            render: (trustScore) => (
              <span className="exchange-trust-score">
                <Progress
                  steps={10}
                  percent={(Number(trustScore) / 10) * 100}
                  showInfo={false}
                  strokeWidth={10}
                  strokeColor={{
                    from: '#fed507',
                    to: '#4eaf0a',
                  }}
                />
                <Text>{trustScore}</Text>
              </span>
            ),
          },

          {
            title: '24h Volume (Normalized)',
            dataIndex: 'trade_volume_24h_btc_normalized',
            key: 'trade_volume_24h_btc_normalized',

            render: (value) => `₿${millify(value, { precision: 1 })}`,
            align: 'right',

            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) =>
              a.trade_volume_24h_btc_normalized -
              b.trade_volume_24h_btc_normalized,
          },

          {
            title: '24h Volume',
            dataIndex: 'trade_volume_24h_btc',
            key: 'trade_volume_24h_btc',
            render: (value) => `₿${millify(value, { precision: 1 })}`,
            align: 'right',

            sorter: (a, b) => a.trade_volume_24h_btc - b.trade_volume_24h_btc,
          },
        ]}
      />
    </>
  );
}

export default Exchanges;
