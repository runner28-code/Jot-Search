import PropTypes from 'prop-types';
import UnlabeledContent from './UnlabeledContent';

const UNLABELED_CONTENT_ARRAY = ['comments', 'primarySkills', 'expertise', 'resume'];

export default function SectionContent({ contentObject }) {
  const singleProperty = Object.keys(contentObject).length === 1;
  const propertyName = singleProperty ? Object.keys(contentObject)[0] : '';
  
  if ( singleProperty && UNLABELED_CONTENT_ARRAY.includes(propertyName) ) {
    const contentString = !contentObject[propertyName] ? 'None provided' : contentObject[propertyName];
    return <UnlabeledContent 
      contentText={contentString} 
      propertyName={propertyName}
    />
  }
  return renderMultipleProperties(contentObject);
