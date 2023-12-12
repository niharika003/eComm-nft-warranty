// import Wallet_modal from "./modal/wallet_modal";
// import BidsModal from "./modal/bidsModal";
// import BuyModal from "./modal/buyModal";

import Footer from "./Footer";
import CheckValidityModal from "./checkValidityModal";
import Header01 from "./header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header01 />
      {/* <Wallet_modal />
      <BidsModal />*/}
      <CheckValidityModal />
      <main>{children}</main>
      <Footer />
    </>
  );
}
