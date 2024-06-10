import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BalanceSheet from '../page/BalanceSheet';
import { queryClient } from '../utills/queryClient';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
const renderUI = (ui: React.ReactNode) => {
  render(ui, {
    wrapper: AllProviders,
  });
};

describe('Balance sheet', () => {
  it('renders the Balance sheet', async () => {
    renderUI(<BalanceSheet />);

    await waitFor(() => {
      expect(screen.getByTestId('tableSkeletonId')).toBeVisible();
    });

    // Balance Sheet should be shown
    await waitFor(() => {
      expect(screen.getByTestId('tableHeaderId')).toHaveTextContent(
        'Balance Sheet',
      );
    });

    await waitFor(() => {
      const tableSections = screen.getAllByTestId('tableCellHeaderId');
      expect(tableSections.length).toEqual(3);
    });
  });
});
