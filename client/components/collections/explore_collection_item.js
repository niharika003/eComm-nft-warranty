import axios from "axios";
import { useMetaMask } from "metamask-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useSelector } from "react-redux";

const Explore_collection_item = ({ itemFor }) => {
  const { sortedCollectionData } = useSelector((state) => state.counter);
  const { account } = useMetaMask();
  const [itemData, setItemData] = useState([]);
  console.log(account);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setItemData(response.data);
        response.data.sort((a, b) => {
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampB - timestampA;
        });
        console.log(response);
      })
      .catch((error) => console.error(error));
  }, []);

  if (itemFor === "explore-collection") {
    return (
      <>
        {itemData.map((item) => {
          if (item.status === "sold") return;
          const { id, image, userImage, name, timestamp, nft } = item;
          return (
            <article key={id}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <Link href="/collection/avatar_1" legacyBehavior>
                  <a className="flex ">
                    <span>
                      <img
                        src={`${image}`}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                        loading="lazy"
                      />
                    </span>
                  </a>
                </Link>

                <Link href={`/explore/${item._id}`} legacyBehavior>
                  <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                    {name}
                  </a>
                </Link>

                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                  <div className="flex flex-wrap items-center">
                    <Link
                      href={`https://sepolia.etherscan.io/address/${nft.ownerNFT}`}
                      legacyBehavior
                    >
                      <a className="mr-2 shrink-0">
                        <MetaMaskAvatar
                          className="h-5 w-5 rounded-full"
                          address={nft.ownerNFT}
                          size={24}
                        />
                      </a>
                    </Link>
                    <span className="dark:text-jacarta-400 mr-1">by</span>
                    <Link
                      href={`https://sepolia.etherscan.io/address/${nft.ownerNFT}`}
                      legacyBehavior
                    >
                      <a className="text-accent">
                        <span>{nft.ownerNFT.slice(0, 6)}...</span>
                      </a>
                    </Link>
                  </div>
                  <span className="dark:text-jacarta-300 text-sm">
                    {timestamp.slice(0, 10)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </>
    );
  } else if (itemFor === "myorders") {
    return (
      <>
        {itemData.map((item) => {
          if (item.nft.ownerNFT.toLowerCase() !== account.toLowerCase()) return;
          const { id, image, userImage, name, timestamp, nft, seller } = item;
          return (
            <article key={id}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <Link href="/collection/avatar_1" legacyBehavior>
                  <a className="flex ">
                    <span>
                      <img
                        src={`${image}`}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                        loading="lazy"
                      />
                    </span>
                  </a>
                </Link>

                <Link href={`/explore/${item._id}`} legacyBehavior>
                  <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                    {name}
                  </a>
                </Link>

                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                  <div className="flex flex-wrap items-center">
                    <Link
                      href={`https://sepolia.etherscan.io/address/${seller}`}
                      legacyBehavior
                    >
                      <a className="mr-2 shrink-0">
                        <MetaMaskAvatar
                          className="h-5 w-5 rounded-full"
                          address={seller}
                          size={24}
                        />
                      </a>
                    </Link>
                    <span className="dark:text-jacarta-400 mr-1">by</span>
                    <Link
                      href={`https://sepolia.etherscan.io/address/${seller}`}
                      legacyBehavior
                    >
                      <a className="text-accent">
                        <span>{seller.slice(0, 6)}...</span>
                      </a>
                    </Link>
                  </div>
                  <span className="dark:text-jacarta-300 text-sm">
                    {timestamp.slice(0, 10)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </>
    );
  }
};

export default Explore_collection_item;
