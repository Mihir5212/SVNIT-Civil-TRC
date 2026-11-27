import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <Header />
      <main className="flex-1 pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;