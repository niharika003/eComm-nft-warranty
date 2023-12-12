import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const TransactionTable = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/transactions")
      .then((response) => {
        console.log(response.data);
        setTransactionsData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="scrollbar-custom mt-14 overflow-x-auto rounded-lg">
        <div
          className="tab-pane fade show active"
          id="offers"
          role="tabpanel"
          aria-labelledby="offers-tab"
        >
          <div
            role="table"
            className="scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 grid max-h-72 w-full grid-cols-5 overflow-y-auto rounded-lg rounded-tl-none border bg-white text-sm dark:text-white"
          >
            <div className="contents" role="row">
              <div
                className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4"
                role="columnheader"
              >
                <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                  Price
                </span>
              </div>
              <div
                className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4"
                role="columnheader"
              >
                <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                  INR Price
                </span>
              </div>
              <div
                className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4"
                role="columnheader"
              >
                <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                  Expiration
                </span>
              </div>
              <div
                className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4"
                role="columnheader"
              >
                <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                  From
                </span>
              </div>
              <div
                className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4"
                role="columnheader"
              >
                <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                  To
                </span>
              </div>
            </div>
            {transactionsData.map((item) => {
              const { _id, buyer, seller, product } = item;

              return (
                <div className="contents" role="row" key={_id}>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap border-t py-4 px-4"
                    role="cell"
                  >
                    <span className="-ml-1" data-tippy-content="ETH">
                      <svg className="icon mr-1 h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                    <span className="text-green text-sm font-medium tracking-tight">
                      {product?.priceEth.toString().slice(0, 6)} ETH
                    </span>
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4"
                    role="cell"
                  >
                    ₨. {product.price}
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4"
                    role="cell"
                  >
                    {product.warranty.warranty}{" "}
                    {product.warranty.warrantyDuration}
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link
                      href={`https://sepolia.etherscan.io/address/${seller}`}
                      legacyBehavior
                    >
                      <a className="text-accent">{seller.slice(0, 7)}</a>
                    </Link>
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link
                      href={`https://sepolia.etherscan.io/address/${buyer}`}
                      legacyBehavior
                    >
                      <a className="text-accent">{buyer.slice(0, 7)}</a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
