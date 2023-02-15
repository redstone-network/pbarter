import {
  RouterProvider,
} from "react-router-dom";
import router from '~/routers';

export const App = () => {
  return (
    <div className="w-screen h-screen bg-background">
        <RouterProvider router={router} />
    </div>
  );
};
