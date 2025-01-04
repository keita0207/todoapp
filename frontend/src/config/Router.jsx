import { createBrowserRouter } from 'react-router-dom';
import TopPage from '../components/TopPage';

// urlとなるcomponentsを追加していく
// componentsのfile_nameは共通でindexにする(folder_nameが変わる)
const router = createBrowserRouter([{ path: '/', element: <TopPage /> }]);

export default router;
