import { Outlet } from 'react-router-dom';
import { NavBar } from '../Navbar/navbar';
import { Footer } from '../footer/Footer';
import { ModalWrapper } from './ui/custom-ui/dialog-layout';
import { useAppContext } from '../lib/context/app.context';
export const PageLayout = () => {
  const { toastTrigger, toastContent } = useAppContext();

  return (
    <div className="m-auto min-h-[100vh] flex flex-col">
      <NavBar />
      <main className="my-0">
        <ModalWrapper trigger={<button ref={toastTrigger}></button>}>
          {toastContent}
        </ModalWrapper>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
