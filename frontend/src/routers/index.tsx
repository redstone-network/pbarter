import { createBrowserRouter } from 'react-router-dom';
import Layout from '~/components/Layout'
import Home from '~/views/Home';
import NftList from '~/views/List';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'nft',
        element: <NftList/>
      }
    ]
  }
]);
export default router;
