import {
  Avatar,
  Button,
  Popover,
  Progress,
  Radio,
  Row,
  Table,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import CurrencySelect from 'src/components/CurrencySelect';
import useStickyState from 'src/hooks/useStickyState';
import { useGetExchangeRateListQuery } from 'src/services/currencyApi';
import {
  useGetExchangesCountQuery,
  useGetExchangesQuery,
} from 'src/services/exchangeAPI';

const { Text, Title } = Typography;

Exchanges.propTypes = {};

function Exchanges() {
  const [displayCurrency, setDisplayCurrency] = useStickyState(
    'currency-iso-code',
    'btc'
  ); // currency code
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // get exchange rate data for the on-page currency by that currency code
  const { data: exchangeRates } = useGetExchangeRateListQuery();
  const ratesData = exchangeRates?.rates ?? {};

  const currencyRate = ratesData[displayCurrency];
  const rateValue = currencyRate?.value || 1;

  const formatInCurrency = (value) => {
    const numberFormat = new Intl.NumberFormat('en-US', {});

    const formattedNumber = numberFormat.format(value);
    return `${formattedNumber} ${displayCurrency.toUpperCase()}`;
  };

  // fetch the data list of exchanges (website that trade crypto)
  const { data: exchangesResponse, isFetching } = useGetExchangesQuery({
    page: 1,
    per_page: 100,
  });

  const { data: totalExchangeCount } = useGetExchangesCountQuery();
  console.log({ totalExchangeCount });

  useEffect(() => {
    const pagingData = {
      ...exchangesResponse.pagination,
      total: totalExchangeCount,
    };

    setPagination(pagingData);
  }, [exchangesResponse]);

  const [filters, setFilters] = useState({
    page: 1,
    per_page: 100,
  });
  const [pagination, setPagination] = useState({
    limit: 100,
    total: 10,
    page: 1,
  });

  const exchangeList = exchangesResponse?.data
    ?.map((exchange) => ({
      ...exchange,
      key: exchange.id, // unique key of each row passing for AntD Table
    }))
    .map((exchange) => {
      return {
        ...exchange,
        trade_volume_24h_btc: rateValue * exchange.trade_volume_24h_btc,
        trade_volume_24h_btc_normalized:
          rateValue * exchange.trade_volume_24h_btc_normalized,
      };
    });

  if (isFetching) return 'Loading...';

  // console.log(exchangeList);

  // console.log(`Row ${index} of marketShare.render()`, { record });
  const handleCurrencyChange = (currencyCode) => {
    setDisplayCurrency(currencyCode);
    setShowCurrencyDropdown(false);
  };

  const handlePageChange = (page, pageSize) => {};

  return (
    <>
      <Row justify="space-around" align="middle">
        <Popover
          content={<CurrencySelect onChange={handleCurrencyChange} />}
          overlayClassName="cm-popover-no-arrow currency-dropdown"
          placement="bottomLeft"
          trigger="click"
          visible={showCurrencyDropdown}
          onVisibleChange={(visible) => setShowCurrencyDropdown(visible)} // change visible on clicking outside popover
        >
          <Button
            className="exchange-currency-selector"
            shape="round"
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          >
            {displayCurrency.toUpperCase()}
          </Button>
        </Popover>

        <Title level={2} style={{ textAlign: 'center' }}>
          Top Cryptocurrency Exchanges Ranking by Trust Score
          <div style={{ textAlign: 'center', fontSize: '18px' }}>
            {'* Read the '}
            <a
              href="https://blog.coingecko.com/trust-score-explained/"
              target="_blank"
            >
              methodology
            </a>
          </div>
        </Title>

        <Radio.Group defaultValue="a">
          <Radio.Button value="a">Overview</Radio.Button>
          <Radio.Button value="b">24h</Radio.Button>
          <Radio.Button value="c">7d</Radio.Button>
        </Radio.Group>
      </Row>
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
          total: pagination.total,
          onChange: handlePageChange,
        }}
        sortDirections={['descend', 'ascend']}
        // columns declaration
        columns={[
          {
            title: '#',
            dataIndex: 'trust_score_rank',
            key: 'trust_score_rank',
            width: 70,

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

            render: (value) => `${formatInCurrency(value)}`,
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
            render: (value) => `${formatInCurrency(value)}`,
            align: 'right',

            sorter: (a, b) => a.trade_volume_24h_btc - b.trade_volume_24h_btc,
          },
        ]}
      />
    </>
  );
}

export default Exchanges;
