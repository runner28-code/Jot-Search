// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter } from 'react-router-dom';
import CandidateContext from './services/CandidateContext';
import CareerContext from './services/CareerContext';
import CategoryContext from './services/CategoryContext';
import ScrollToTop from './hooks/scrollToTop';
import App from './App';
import './index.css';

export const queryClient = new QueryClient();
const isDevelopment = window.location.hostname === 'localhost';

ReactDOM.render(
    <BrowserRouter>
      <CandidateContext>
        <CareerContext>
          <CategoryContext>
            <ScrollToTop />
            <App />
          </CategoryContext>
        </CareerContext>
      </CandidateContext>
    </BrowserRouter>
    {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>,
