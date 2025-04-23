// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter } from 'react-router-dom';
import CareerContext from './services/CareerContext';
import CategoryContext from './services/CategoryContext';
import ScrollToTop from './hooks/scrollToTop';
