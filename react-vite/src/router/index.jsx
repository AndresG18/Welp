import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage'
import Businesses from '../components/Businesses/Businesses';
import OneBusiness from '../components/OneBusiness/OneBusiness'
import BusinessForm from '../components/BusinessForm/BusinessForm'
import ReviewsForm from '../components/ReviewsForm/ReviewForm'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/bus",
        element: <Businesses />
      },
      {
        path: "/bus/:busId",
        element: <OneBusiness />
      },
      {
        path: "/bus/new",
        element: <BusinessForm />
      },
      {
        path: "/bus/:busId/edit",
        element: <BusinessForm />
      },
      {
        path: "bus/:busId/reviews/new",
        element: <ReviewsForm />
      },
      {
        path: "bus/:busId/reviews/:reviewId/edit",
        element: <ReviewsForm />
      },
      {
        path: "*",
        element: <h1>Not Found</h1>
      }
    ],
  },
]);
