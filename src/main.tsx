import { App } from '@/App';
import { queryClient } from '@/api/query-client';
import { ThemeProvider } from '@/providers/theme-provider';
import reportWebVitals from '@/reportWebVitals';
import { AuthStoreProvider } from '@/store/auth-store';
import '@/styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AuthStoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthStoreProvider>
    </QueryClientProvider>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
