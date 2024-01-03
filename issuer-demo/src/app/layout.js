import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Veramo issue demo',
	description: 'Next app for issuing credentials with Veramo',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className='dark'>
			<body className={inter.className}>
				<Providers>
					<div>{children}</div>
				</Providers>
			</body>
		</html>
	);
}
