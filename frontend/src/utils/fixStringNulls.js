const NULL_STRING_ARRAY = ['null', 'undefined', 'null, null, null'];

export default function fixStringNulls(data) {
  for (let key in data) {
      data[key] = null;
    }
  }
  return data;
