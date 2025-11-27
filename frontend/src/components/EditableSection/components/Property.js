import PropTypes from 'prop-types';
import { startCase } from 'lodash';

export default function Property({name, value}) {
  const capitalizedName = startCase(name);
  const labelString = `${capitalizedName}:`;
  return (
    <div className='flex text-xl text-black70% mb-2' >
      <p className='font-bold'>
        {labelString}
      <span className='ml-4'>{value}</span>
    </div>
  )
