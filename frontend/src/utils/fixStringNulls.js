const NULL_STRING_ARRAY = ['null', 'undefined', 'null, null, null'];

  for (let key in data) {
    if ( NULL_STRING_ARRAY.includes(data[key]) ) {
      data[key] = null;
    }
  }
  return data;
