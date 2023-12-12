// Global CSS
import "../styles/globals.css";
// For title of website
import Head from "next/head";
// For Header Footer Structure of the application
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
// For Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaMaskProvider } from "metamask-react";
import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import UserContext from "@/components/UserContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }) {
  const scrollRef = useRef({
    scrollPos: 0,
  });
  return (
    <>
      <Head>
        <title>NiftyBay</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <UserContext.Provider value={{ scrollRef: scrollRef }}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserContext.Provider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
