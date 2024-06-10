import 'whatwg-fetch';
import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { test1 } from './testData';

const handler = [
  http.get('*/balance-sheet', () => {
    return HttpResponse.json(test1);
  }),
];

export const server = setupServer(...handler);
// runs a clean after each test case (e.g. clearing jsdom)
beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
