import PropTypes from 'prop-types';

export const PaginationButton = ({ page, disabled, prefetchFunc, active, setPage, children }) => {
  const buttonStyles = 'ml-3 border-royalBlue border-2 text-royalBlue h-16 w-16 px-2 py-2 rounded-md'
  const activeButtonStyles = 'bg-royalBlue !text-white'
  const disabledButtonStyles = 'disabled:opacity-50 disabled:bg-gray-500 disabled:border-none disabled:text-white cursor-not-allowed'

  return (
    <button
      disabled={disabled}
      onClick={() => setPage(page)}
      onMouseOver={() => prefetchFunc?.(page)}
    >
      {children}
    </button>
  );
