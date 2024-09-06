import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import TipsDetails from "./components/tips/TipsDetails";
import ArticlePage from "./pages/ArticlePage";
import ArticleDetail from "./components/articles/ArticleDetails";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./components/products/ProductDetails";
import AuthModal from "./components/AuthModal";
import { Toaster } from "react-hot-toast";
import Add from "./pages/Add";
import TipsPage from "./pages/TipsPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Share from "./components/Share";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <ProductPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <ProductDetails />
          <Footer />
        </>
      ),
    },
    {
      path: "/articles",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <ArticlePage />
          <Footer />
        </>
      ),
    },
    {
      path: "/articles/:id",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <ArticleDetail />
          <Footer />
        </>
      ),
    },
    {
      path: "/tips",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <TipsPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/tips/:id",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <TipsDetails />
          <Footer />
        </>
      ),
    },
    {
      path: "/add",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <Add />
          <Footer />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <ScrollToTop />
          <Header />
          <Profile />
          <Footer />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <ScrollToTop />
          <NotFound />
        </>
      ),
    },
  ]);

  return (
    <>
      <div className="max-w-screen h-full">
        <RouterProvider router={router} />

        <AuthModal />
        <Share />
        <Toaster />

      </div>
    </>
  );
}

export default App;
