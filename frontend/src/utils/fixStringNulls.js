
export default function fixStringNulls(data) {
  for (let key in data) {
    if ( NULL_STRING_ARRAY.includes(data[key]) ) {
      data[key] = null;
    }
  }
  return data;
