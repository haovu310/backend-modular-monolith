import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Loader from '../../components/Loader/Loader';

const About = lazy(() => import('../../pages/About'));
const PropertyTable = lazy(() => import('../../component/property/property_table/PropertyTable'));

const RouteConfig = () => {

    return (
          <Suspense fallback={<Loader className="w-8 h-8" />}>
            <Routes>
              <Route path="/" element={<PropertyTable />} />
              <Route path="/checkpoint" element={<About />} />
              
            </Routes>
          </Suspense>
    )
}

export default RouteConfig;