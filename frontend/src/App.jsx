import { RouterProvider } from 'react-router-dom';
import router from '../src/config/Router';

function App() {
  return <RouterProvider router={router} />;
};

export default App;
