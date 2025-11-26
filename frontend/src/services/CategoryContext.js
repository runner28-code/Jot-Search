import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from './API';

export const CategoryContext = createContext();

const CategoryProvider = ({children}) => {
  const [categories, setCategories] = useState([]);

  useEffect( async () => {
    const categoriesFromAPI = await getCategories();
    localStorage.setItem('categories', JSON.stringify(categoriesFromAPI));
    setCategories(categoriesFromAPI);
  }, [])
  
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  )
