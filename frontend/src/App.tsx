import {
  RouterProvider,
} from "react-router-dom";
import router from '~/routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <div className="w-screen h-screen bg-background">
        <ToastContainer />
        <RouterProvider router={router} />
    </div>
  );
};
