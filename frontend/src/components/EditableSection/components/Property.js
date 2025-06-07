import PropTypes from 'prop-types';
import { startCase } from 'lodash';

export default function Property({name, value}) {
  const capitalizedName = startCase(name);
  const labelString = `${capitalizedName}:`;
  return (
      <p className='font-bold'>
        {labelString}
      </p>
      <span className='ml-4'>{value}</span>
    </div>
  )
