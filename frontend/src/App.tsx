import { QueryClientProvider } from '@tanstack/react-query';

import { AppHeader } from './components/AppHeader';
import { MainBodyLayout } from './components/MainBodyLayout';
import BalanceSheet from './page/BalanceSheet';
import { queryClient } from './utills/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader />
      <MainBodyLayout>
        <BalanceSheet />
      </MainBodyLayout>
    </QueryClientProvider>
  );
}

export default App;
