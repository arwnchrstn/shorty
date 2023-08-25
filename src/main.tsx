import ReactDOM from 'react-dom/client'
import App from '@/App'
import { ThemeProvider } from '@mui/material'
import useCustomTheme from '@/hooks/useCustomTheme'
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <Router>
    <ThemeProvider theme={useCustomTheme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </Router>
)
