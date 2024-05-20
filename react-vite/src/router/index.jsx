import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Layout from './Layout';


export const router = () => {
  return (
    <BrowserRouter>
    <Layout/>
      <Routes>
        <Route path="/" element={ <h1>Welcome!</h1> }>
          <Route path="/businesses" element={<null />} />
          <Route path="/businesses/new" element={<null />} />
          <Route path="/businesses/:busId" element={<null />} />
          <Route path="/businesses/:id/reviews" element={<null />} />
          <Route path="/businesses/:id/reviews/new" element={<null />} />
          <Route path="/reviews/:id/edit" element={<null />} />
          <Route path='*' element={<h1>Page not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};