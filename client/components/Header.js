import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const Header = () => {
  const router = useRouter();
  // Define an array of routes where the search bar should not be rendered
  const excludedRoutes = ["/login", "/signup", "/forgot-password"];

  // Check if the current route is excluded from rendering the search bar
  const isExcludedRoute = excludedRoutes.includes(router.pathname);

  const handleClose = () => {
    const drawer = document.querySelector("[role='dialog']");
    drawer.classList.add("hidden");
  };
  const handleOpen = () => {
    const drawer = document.querySelector("[role='dialog']");
    drawer.classList.remove("hidden");
  };

  return (
    <header className="bg-white text-white shadow dark:bg-gray-900">
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-4 lg:px-8 text-white"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-0.5 p-1.5">
            <span className="sr-only">NiftyBay</span>
            <img className="h-8 w-auto" src="/logo.png" alt="" />
          </a>
        </div>

        <div className="flex flex-1 flex-row">
          <div className="relative mx-4 w-full">
            {!isExcludedRoute && (
              <>
                <span className="sr-only">Search products</span>
                <input
                  type="text"
                  className="flex w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Search products"
                />
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="gray"
                  >
                    <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                  </svg>
                </span>
              </>
            )}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={handleOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/login"
            className="text-sm font-semibold leading-6 text-white-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      <div className="lg:hidden hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">NiftyBay</span>
              <img className="h-8 w-auto" src="/logo.png" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={handleClose}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="/wishlist"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Wishlist
                </a>
                <a
                  href="/history"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Order
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
