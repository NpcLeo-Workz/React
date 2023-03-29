import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import LoadingPage from "./utils/loadingPage.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: false,
            refetchOnWindowFocus: import.meta.env.PROD,
        }
    }
})
ReactDOM.createRoot(document.getElementById('root')).render(

      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <React.Suspense fallback={<LoadingPage/>}>
              <App />
              </React.Suspense>
          </QueryClientProvider>
      </BrowserRouter>

)
