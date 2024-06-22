import Header from './components/header/Header'
import Footer from './components/Footer'

function Layout({children}) {
  return (<div className=''>
    <Header/>
    <div className='md:p-4 p-2'>
    {children}
    </div>
    <Footer/>
    </div>
  )
}

export default Layout