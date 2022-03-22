import Text from 'antd/lib/typography/Text';

function CurrencyOption({ data, onClick }) {
  // console.log(data.name, className);
  return (
    <div className="currency-option" onClick={onClick}>
      <Text type="secondary" className="currency-unit">
        {data.currencyCode.toUpperCase()}
      </Text>
      <Text className="currency-name">{data.name}</Text>
    </div>
  );
}

export default CurrencyOption;
