const NULL_STRING_ARRAY = ['null', 'undefined', 'null, null, null'];

export default function fixStringNulls(data) {
// Temp comment
  for (let key in data) {
    if ( NULL_STRING_ARRAY.includes(data[key]) ) {
      data[key] = null;
    }
  }
  return data;
