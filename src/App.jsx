import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import TipsDetails from "./components/tips/TipsDetails";
import ArticlesGrid from "./components/articles/ArticleGrid";
import ArticleDetail from "./components/articles/ArticleDetails";
import EcoFriendlyProducts from "./components/products/ProductCard";
import ProductDetails from "./components/products/ProductDetails";
import AuthModal from "./components/AuthModal";
import UserService from "./services/user.service";
import { useThemeContext } from "./context/ThemeProvider";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Add from "./pages/Add";
import TipsCard from "./components/tips/TipsCard";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { user, setUser } = useThemeContext();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user) {
        console.log("saving");
        try {
          const response = await UserService.getCurrentUser();
          if (response.data && response.data.result) {
            console.log(response.data.result);
            setUser(response.data.result);
          }
        } catch (error) {
          console.error("Failed to fetch current user", error);
        }
      }
    };

    fetchCurrentUser();
  }, [user, setUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
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
          <EcoFriendlyProducts />
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
          <ArticlesGrid />
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
          <TipsCard />
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
  ]);

  return (
    <>
      <div className="max-w-screen h-full">
        <RouterProvider router={router} />

        <AuthModal />
        <Toaster />
      </div>
    </>
  );
}

export default App;
