import { Outlet } from 'react-router-dom';
import { NavBar } from '../Navbar/navbar';
import { Footer } from '../footer/Footer';
export const PageLayout = () => {
  return (
    <div className="m-auto min-h-[100vh] flex flex-col">
      <NavBar />
      <main className="my-0 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
