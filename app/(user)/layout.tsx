import './globals.css'
import { ThemeProvider } from '../../context/StateContext';

import Head from 'next/head'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
import { Navbar, Footer } from '../../components';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className="layout">

          <ThemeProvider>
            <Head>
              <title>DC Store</title>
            </Head>
            <header>
              <Navbar />
            </header>
            
            {children}

            <footer>
              <Footer />
            </footer>
          </ThemeProvider>
      </body>
    </html>
  )
}
