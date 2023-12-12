import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import NFT_Digital_Warranty from "../../NFT_Digital_Warranty.json";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "@/redux/counterSlice";
import { collectTxnHash } from "@/redux/counterSlice";

const Item = () => {
  const { buyModal } = useSelector((state) => state.counter);
  console.log(buyModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const pid = router.query.product;
  const [imageModal, setImageModal] = useState(false);
  const [itemData, setItemData] = useState([]);

  // console.log(expiry); // Output: 1651200000 (corresponds to 2022-05-01 12:00:00 UTC)

  const { connect, status } = useMetaMask();

  const executeSale = async ({ tokenID, expiry, seller }) => {
    console.log("executeSale called?");
    const ethers = require("ethers");

    // Connect to the Ethereum provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Get the deployed contract instance
    let contract = new ethers.Contract(
      NFT_Digital_Warranty.address,
      NFT_Digital_Warranty.abi,
      signer
    );
    /*
    If we want to execute sale of product as well 
    const selectedItem = itemData.find((item) => item._id === pid);
    const priceInWei = Web3.utils.toWei(
      selectedItem.priceEth.toFixed(9),
      "ether"
    );
    */

    // Execute the sale to transfer ownership of the NFT
    await contract
      .executeSale(tokenID, expiry, {
        value: "0",
      })
      .then(async (res) => {
        console.log("Line 40 ", res);
        // Update the product status in MongoDB
        await axios.patch(`/api/updateStatusAndOwnerNFT/${pid}`, {
          ownerNFT: res.from,
        });
        // Add the product to the user's orders in MongoDB
        const transaction = {
          productId: pid,
          buyer: res.from,
          seller: seller,
        };
        const resp = await axios.post("/api/addTransaction", transaction);
        console.log(resp);
        router.push("/");
        // window.location.replace("/");
      });
  };

  const handleBuyNowClick = async () => {
    if (status !== "connected") {
      await connect();
      if (status !== "connected") {
        // User did not connect wallet, redirect to landing page
        window.location.replace("/");
        return;
      }
    }
    console.log("handleBuy Called");
    // Find item with matching _id as pid
    const selectedItem = itemData.find((item) => item._id === pid);
    const seller = selectedItem.nft.ownerNFT;
    // Concatenate warranty duration string
    const warrantyDuration =
      selectedItem.warranty.warranty +
      " " +
      selectedItem.warranty.warrantyDuration;
    const moment = require("moment");

    function getExpiryTimestamp(duration) {
      const [value, unit] = duration.split(" ");
      return moment().add(value, unit).unix();
    }

    // Example usage:
    const expiry = getExpiryTimestamp(warrantyDuration);

    const tokenID = selectedItem.nft.tokenID;
    // Proceed with Buy Now functionality
    executeSale({ tokenID, expiry, seller });
  };

  const handleCheckValidity = async (tokenID) => {
    const ethers = require("ethers");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      NFT_Digital_Warranty.address,
      NFT_Digital_Warranty.abi,
      signer
    );

    let burn;

    try {
      burn = await contract.BurnNFT(tokenID, { value: "0" });
      console.log(burn);
    } catch (err) {
      console.log(err);
    }

    if (!burn) {
      let nft = await contract.getListedTokenForId(tokenID);
      console.log(nft);
      // alert("Your warranty is yet to expire");
      dispatch(buyModalShow());
    }
  };

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
        console.log(itemData.filter((item) => item._id === pid));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="/gradient_light.jpg" alt="gradient" className="h-full" />
        </picture>
        <div className="container">
          {itemData
            .filter((item) => item._id === pid)
            .map((item) => {
              const { image, name, _id, description, priceEth, nft, status } =
                item;
              return (
                <div className="md:flex md:flex-wrap" key={_id}>
                  <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
                    <button
                      className=" w-full"
                      onClick={() => setImageModal(true)}
                    >
                      <img
                        src={image}
                        alt={name}
                        className="rounded-2xl cursor-pointer  w-full"
                      />
                    </button>

                    <div
                      className={
                        imageModal ? "modal fade show block" : "modal fade"
                      }
                    >
                      <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                        <img
                          src={image}
                          alt={name}
                          className="h-full rounded-2xl"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn-close absolute top-6 right-6"
                        onClick={() => setImageModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-6 w-6 fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                      </button>
                    </div>
                  </figure>

                  <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                    <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                      {name}
                    </h1>

                    <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Tippy content={<span>ETH</span>}>
                          <span className="-ml-1">
                            <svg className="icon mr-1 h-4 w-4">
                              <use xlinkHref="/icons.svg#icon-ETH"></use>
                            </svg>
                          </span>
                        </Tippy>
                        <span className="text-green text-sm font-medium tracking-tight">
                          {priceEth} ETH
                        </span>
                      </div>
                    </div>

                    <p className="dark:text-jacarta-300 mb-10">{description}</p>

                    <div className="mb-8 flex flex-wrap">
                      <div className="mb-4 flex">
                        <div className="flex flex-col justify-center">
                          <span className="text-jacarta-400 block text-sm dark:text-white">
                            Owned by
                          </span>
                          <Link href="/user/avatar_6" legacyBehavior>
                            <a className="text-accent block">
                              <span className="text-sm font-bold">
                                {nft.ownerNFT}
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <Link href="#">
                      {status === "sold" ? (
                        <button
                          className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                          onClick={() => {
                            dispatch(collectTxnHash(item.nft.transactionHash));
                            handleCheckValidity(item.nft.tokenID);
                          }}
                        >
                          Check Validity
                        </button>
                      ) : (
                        <button
                          className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                          onClick={() => handleBuyNowClick()}
                        >
                          Buy Now
                        </button>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Item;
