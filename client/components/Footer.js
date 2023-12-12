import Link from "next/link";
// import { footerMenuList, socialIcons } from "../data/footer_data";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="dark:bg-jacarta-900 page-footer bg-white">
        <div className="container">
          <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Logo --> */}
              <Link href="#" legacyBehavior>
                <a className="mb-6 inline-block">
                  <img
                    src={"/light.ico"}
                    className="max-h-7 dark:hidden"
                    alt="NiftyBay | NFT Marketplace"
                  />
                </a>
              </Link>

              <Link href="#" legacyBehavior>
                <a className=" mb-6 inline-block">
                  <img
                    src={"/favicon.ico"}
                    className="hidden max-h-7 dark:block mb-6"
                    alt="NiftyBay | NFT Marketplace"
                  />
                </a>
              </Link>
              <p className="dark:text-jacarta-300 mb-12">
                Create, sell and collect truly rare assets. Powered by
                blockchain technology.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
            <span className="dark:text-jacarta-400 text-sm">
              <span>© {new Date().getFullYear()} NiftyBay — Made by</span>
              <Link
                href="https://www.linkedin.com/in/niharika-01a606212/"
                legacyBehavior
              >
                <a className="hover:text-accent dark:hover:text-white">
                  {" "}
                  Niharika{" "}
                </a>
              </Link>
              and
              <Link
                href="https://www.linkedin.com/in/mayank-kumar-048a0020b/"
                legacyBehavior
              >
                <a className="hover:text-accent dark:hover:text-white">
                  {" "}
                  Mayank Kumar
                </a>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
