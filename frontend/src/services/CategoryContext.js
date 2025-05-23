import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from './API';

export const CategoryContext = createContext();

const CategoryProvider = ({children}) => {
  const [categories, setCategories] = useState([]);

  useEffect( async () => {
    const categoriesFromAPI = await getCategories();
    // Sometimes need to access categories outside of components, saving in local storage to provide that functionality
    localStorage.setItem('categories', JSON.stringify(categoriesFromAPI));
    setCategories(categoriesFromAPI);
  
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  )
