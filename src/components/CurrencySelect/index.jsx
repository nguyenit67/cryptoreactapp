import { Col, Input, Row, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import CurrencyOption from 'src/components/CurrencySelect/components/CurrencyOption';
import { useGetExchangeRateListQuery } from 'src/services/currencyApi';
import { capitalize } from 'src/utils';

const { Text, Title } = Typography;

const defaultFilterFunc = (inputValue, option) => {
  return (
    option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    option.currencyCode.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const groupingByCurrencyType = (rateList) => {
  const group = {};

  for (const rate of rateList) {
    const { type } = rate;
    if (group[type]) {
      group[type].push(rate);
    } else {
      group[type] = [rate];
    }
  }

  return group;
};

const representCurrencyType = (typeName) => {
  switch (typeName) {
    case 'crypto':
      return capitalize(typeName) + 'currencies';
      break;

    case 'commodity':
      return 'Commodities';
      break;

    default:
      return `${capitalize(typeName)} Currencies`;
      break;
  }
};

function CurrencySelect({ onChange, filterFunc = defaultFilterFunc }) {
  const { data, isFetching } = useGetExchangeRateListQuery();
  const ratesData = data?.rates ?? {};
  const [currencyTerm, setCurrencyTerm] = useState('');

  // if (isFetching) return 'Loading...';
  const rateList = Object.entries(ratesData).map(([currencyCode, value]) => ({
    ...value,
    currencyCode,
  }));

  const filteredRateList = rateList.filter((rateOption) =>
    filterFunc(currencyTerm, rateOption)
  );

  const groupedFilterRates = groupingByCurrencyType(filteredRateList);

  console.log(groupedFilterRates);

  const handleInputChange = (e) => {
    setCurrencyTerm(e.target.value);
  };

  const handleOptionClick = (currencyCode) => {
    if (!onChange) return;

    onChange(currencyCode);
  };

  return (
    <div className="currency-select">
      <Input
        className="currency-select-input"
        placeholder="Search..."
        onChange={handleInputChange}
        allowClear
        // size="small"
      />

      {isFetching ? (
        <Spin />
      ) : (
        // <Row>
        //   {filteredRateList.length > 0 ? (
        //     filteredRateList.map((rate) => (
        //       <Col span={8} key={rate.currencyCode}>
        //         <CurrencyOption
        //           data={rate}
        //           onClick={() => handleOptionClick(rate.currencyCode)}
        //         />
        //       </Col>
        //     ))
        //   ) : (
        //     <Text type="danger">
        //       There is no currency matches{' '}
        //       <strong>(Change this placeholder later)</strong>
        //     </Text>
        //   )}
        // </Row>
        Object.entries(groupedFilterRates).map(
          ([currencyType, currencyList]) => {
            return (
              <div key={currencyType}>
                <Title level={5} className="currency-menu-group-title">
                  {representCurrencyType(currencyType)}
                </Title>
                <Row>
                  {currencyList.map((currency) => (
                    <Col span={8} key={currency.currencyCode}>
                      <CurrencyOption
                        data={currency}
                        onClick={() => handleOptionClick(currency.currencyCode)}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            );
          }
        )
      )}
    </div>
  );
}

export default CurrencySelect;
