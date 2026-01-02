import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Loader from '../../components/Loader/Loader';

const About = lazy(() => import('../../pages/About'));
const ApplicantTable = lazy(() => import('../../component/grid_table/ApplicantTable'));

const RouteConfig = () => {

    return (
          <Suspense fallback={<Loader className="w-8 h-8" />}>
            <Routes>
              <Route path="/" element={<ApplicantTable />} />
              <Route path="/checkpoint" element={<About />} />
              
            </Routes>
          </Suspense>
    )
}

export default RouteConfig;