// import Lenis from 'lenis'
import Landing from './pages/Landing.jsx'
import { ThemeProvider } from "@/components/theme-provider"
// import { useEffect } from 'react'
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Landing />
      </ThemeProvider>
    </>
  )
}

export default App