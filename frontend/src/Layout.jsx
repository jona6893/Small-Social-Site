import Header from './components/header/Header'
import Footer from './components/Footer'

function Layout({children}) {
  return (<div className='p-4'>
    <Header/>
    {children}
    <Footer/>
    </div>
  )
}

export default Layout