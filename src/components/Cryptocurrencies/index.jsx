import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from 'src/services/cryptoApi';

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // console.table(cryptos);

  const mappingIconUrl = (coinList) => coinList.map((coin) => (
      coin.symbol === 'DOGE'
        ? {
          ...coin,
          iconUrl: 'https://clipground.com/images/dogecoin-logo-clipart-2.jpg',
        }
        : coin
    ));

  useEffect(() => {
    // debugger;
    if (isFetching) return;
    // eslint-disable-next-line arrow-body-style
    const filteredCryptos = cryptoList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // setCryptos(filteredCryptos);
    const mappedIconUrlCryptos = mappingIconUrl(filteredCryptos);
    setCryptos(mappedIconUrlCryptos);
    // console.log({ mappedIconUrlCryptos });
    // debugger;
  }, [cryptoList, searchTerm]);

  // debugger;

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]}>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
