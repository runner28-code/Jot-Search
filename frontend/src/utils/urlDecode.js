export default function urlDecode(decodeString) {
  if ( !decodeString ) {
    return '';
  }
  let decodedString = decodeString;
  decodedString = decodedString.replace(/%20/g, ' ');
  decodedString = decodedString.replace(/%2C/g, ',');
  decodedString = decodedString.replace(/%2F/g, '/');
  decodedString = decodedString.replace(/%3A/g, ':');
  decodedString = decodedString.replace(/%26/g, '&');
  return decodedString;
