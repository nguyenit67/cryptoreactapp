import { Fragment } from 'react';

export default function mapKeyWithIndex(arrToMap, callBackFn) {
  return arrToMap.map((...args) => (
    <Fragment key={index}>{callBackFn(...args)}</Fragment>
  ));
}
