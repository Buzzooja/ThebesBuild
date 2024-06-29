import ClientOnly from './components/ClientOnly';
import LoginModel from './components/models/LoginModel';
import RegisterModel from './components/models/RegisterModel';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import AddWorkoutModel from './components/models/AddWorkoutModel';

export const metadata = {
  title: 'Thebes',
  description: 'Thebes',
  icons: {
    icon: [
      '/favicon.ico?v=4'
    ],
    apple: [
      '/apple-touch-icon.png?v=4'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ],
    manifest: '/site.webmanifest'
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className='bg-gradient-to-r from-teal-600 to-neutral-800'>
        <ClientOnly>
          <ToasterProvider />
          <AddWorkoutModel 
          />
          <LoginModel />
          <RegisterModel />
          <div>
          <Navbar currentUser={currentUser}/>
          </div>
        </ClientOnly>
          <div className='
          pt-28
          sm:pt-30
          md:pt-48
          xl:pt-48
          '>
            {children}
          </div>
      </body>
    </html>
  )
}
