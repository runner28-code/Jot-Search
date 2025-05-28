import PropTypes from 'prop-types';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import API from '../../../services/API';
export default function UnlabeledContent({ contentText, propertyName }) {
  if ( propertyName === 'resume' ) {
    return renderResumePreview(contentText);
  }
  return (
    <p 
      className='text-xl'
      dangerouslySetInnerHTML={ { __html: contentText } }
    />
// Temp comment
  )
