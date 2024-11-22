import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage'
import AllBusinesses from '../components/Businesses/AllBusinesses';
import OneBusiness from '../components/OneBusiness/OneBusiness'
import BusinessForm from '../components/BusinessForm/BusinessForm'
import ReviewsForm from '../components/ReviewsForm/ReviewForm'
import BusinessManage from '../components/BusinessManage';
import UpdateBusiness from '../components/UpdateBusiness';
import UpdateReview from '../components/UpdateReview/UpdateReview';
import BusinessImageForm from '../components/BusImageForm/BusImageForm';
import GiftChooser from '../components/GiftChooser/GIftChooser';
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
        path: "/bus/current",
        element: <BusinessManage />
      },
      {
        path: "/bus",
        element: <AllBusinesses />
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
        element: <UpdateBusiness />
      },
      {
        path: "bus/:busId/reviews/new",
        element: <ReviewsForm />
      },
      {
        path: "bus/:busId/reviews/:reviewId/edit",
        element: < UpdateReview />
      },
      {
        path: "/bus/:busId/images/new",
        element: < BusinessImageForm />
      },
      {
        path: "/gift",
        element: < GiftChooser />
      },
      {
        path: "*",
        element: <h1>Not Found</h1>
      }
    ],
  },
]);
