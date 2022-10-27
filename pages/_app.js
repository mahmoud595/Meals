import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { getSavedMeal } from './savedMeals';

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: 1 * 60 * 60 * 1000,
    cacheTime: 1 * 60 * 60 * 1000,
    refetchOnMount: false,
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
      savedMeals.forEach((meal) => (
        queryClient.prefetchQuery(['singleMeal', meal], getSavedMeal)

      ));
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([]));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
