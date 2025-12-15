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
  )
}

UnlabeledContent.propTypes = {
  contentText: PropTypes.string,
  propertyName: PropTypes.string,
}

function renderResumePreview(resumeURL) {
  const baseURL = API.defaults.baseURL;
  const resumeURLWithBase = `${baseURL}${resumeURL}`;
  return <DocViewer 
    documents={ [{ uri: resumeURLWithBase}] } // Requires an array of objects with URIs 
    pluginRenderers={ DocViewerRenderers }
    config={{
      header: {
        disableFileName: true,
      }
    }}/>;
}