import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Providers from './Providers';
import Navbar from '@/components/Navbar';
import SearchBox from '@/components/SearchBox';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'About Movis JS',
  description: 'Prova de progração 3',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='bg-preto'>
      <body className={inter.className}>
        <Providers>
          <Header />
          <SearchBox />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
