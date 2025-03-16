import { CircularProgress } from '@mui/material';
import { MaterialApp } from 'material-app';
import { Suspense } from 'react';
import { FetchConfigProvider, IndexedDBStore } from 'react-fast-fetch';
import xior from 'xior';
import { themes } from './config/theme';
import LandingLayout from './layouts/landing';
import HomePage from './pages/home';

const store = new IndexedDBStore({ limit: 10000 });
const fetcher = (url: string) => xior.get(url).then((res) => res.data);

export default function App() {
  return (
    <FetchConfigProvider store={store} fetcher={fetcher}>
      <Suspense
        fallback={
          <CircularProgress
            size={48}
            sx={{
              display: 'block',
              position: 'fixed',
              left: '50%',
              top: '50%',
              m: -3,
            }}
          />
        }
      >
        <MaterialApp themes={themes}>
          <LandingLayout>
            <HomePage />
          </LandingLayout>
        </MaterialApp>
      </Suspense>
    </FetchConfigProvider>
  );
}
