import { useState, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import PropTypes from 'prop-types';
import {
  FiChevronLeft as BackIcon,
  FiChevronRight as NextIcon,
} from 'react-icons/fi';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ResumePreview = ({ resumeUrl }) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: resumeUrl,
    page,
    canvasRef,
  });

  const buttonStyles = 'w-15 h-15 ';
  const buttonStylesDisabled = 'w-15 h-15 opacity-50';
  const prevButtonDisabled = page === 1;
  const nextButtonDisabled = page === pdfDocument?.numPages;

  return (
    <div className='border border-grey300 border-2 rounded-lg'>
      {!pdfDocument && <LoadingSpinner />}
      <canvas
        className='rounded-lg'
      />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="flex justify-between">
            <li className="previous">
              <button
                disabled={prevButtonDisabled}
                onClick={() => setPage(page - 1)}
              >
                <BackIcon className={prevButtonDisabled ? buttonStylesDisabled : buttonStyles} />
              </button>
            </li>
            <li>Page {page} of {pdfDocument.numPages}</li>
            <li className="next">
              <button
                disabled={nextButtonDisabled}
                onClick={() => setPage(page + 1)}
              >
                <NextIcon className={nextButtonDisabled ? buttonStylesDisabled : buttonStyles} />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
