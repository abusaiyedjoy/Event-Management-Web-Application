
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}
export default App;