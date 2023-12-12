import { uploadFileToIPFS, uploadJSONToIPFS } from "@/pinata";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import NFT_Digital_Warranty from "../NFT_Digital_Warranty.json";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const NFT = () => {
  const { productID } = useSelector((state) => state.counter);
  const { theme } = useTheme();
  const router = useRouter();
  const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "SVG"];
  const ethers = require("ethers");
  const [file, setFile] = useState("");

  const [nftData, setNftData] = useState({
    sno: uuidv4(),
    name: "",
    img_url: "",
  });

  const handleImageChange = (file) => {
    setFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isUploadDisabled = () => {
    return !nftData.name || !nftData.sno || !file;
  };

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      getAddress();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  async function uploadMetadataToIPFS() {
    if (!nftData.name || !nftData.img_url) return;
    const nftJSON = {
      name: nftData.name,
      image: nftData.img_url,
      serialno: nftData.sno,
      productID,
    };
    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    try {
      const response = await uploadFileToIPFS(file);

      if (response.success === true) {
        setNftData((prevState) => ({
          ...prevState,
          img_url: response.pinataURL,
        }));
      }
    } catch (e) {
      console.log("Error during file upload:", e);
    }
  }

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    // updateAddress(addr);
    console.log(addr);
  }

  useEffect(() => {
    const listComplete = async () => {
      try {
        const metadataURL = await uploadMetadataToIPFS();

        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(
          NFT_Digital_Warranty.address,
          NFT_Digital_Warranty.abi,
          signer
        );

        let transaction = await contract.createToken(metadataURL, nftData.sno, {
          value: "0",
        });

        let receipt = await transaction.wait();
        let txHash = receipt.transactionHash;
        let ownerNFT = receipt.from;
        console.log(receipt);
        let tokenID = await contract.getCurrentToken();
        tokenID = tokenID.toNumber();

        const requestData = {
          name: nftData.name,
          image: nftData.img_url,
          sno: nftData.sno,
          productID: productID,
          tokenID: tokenID,
          transactionHash: txHash,
          ownerNFT: ownerNFT,
        };
        const response = await axios.post("/api/associateNFT", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success("Added Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: `${theme}`,
          });
          router.push("/");
        } else {
          toast.error("Failed to add product", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: `${theme}`,
          });
        }
      } catch (e) {
        console.log("Error uploading metadata to IPFS or creating token:", e);
        alert("Upload error" + e);
      }
    };
    if (nftData.img_url) {
      listComplete();
    }
  }, [nftData.img_url]);

  return (
    <div>
      <Head>
        <title>Upload || NiftyBay</title>
      </Head>
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            NFT
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- Name --> */}
            <div className="mb-6">
              <label
                htmlFor="product-id"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Product ID<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="product-id"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                required
                value={productID}
                disabled={true}
              />
            </div>

            {/* <!-- File Upload --> */}
            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Image
                <span className="text-red">*</span>
              </label>

              {file ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Successfully Uploaded : {file.name}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Drag or Choose your file to upload
                </p>
              )}

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                    JPG, PNG, GIF, SVG. Max size: 100 MB
                  </p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <FileUploader
                    handleChange={handleImageChange}
                    types={fileTypes}
                    classes="file-drag"
                    maxSize={100}
                    minSize={0}
                  />
                </div>
              </div>
            </div>

            {/* <!-- Name --> */}
            <div className="mb-6">
              <label
                htmlFor="nft-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="nft-name"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="NFT Name"
                required
                name="name"
                onChange={handleInputChange}
              />
            </div>

            {/* <!-- Submit --> */}
            <button
              disabled={isUploadDisabled()}
              className={
                isUploadDisabled()
                  ? "bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  : "bg-accent rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
              }
              onClick={listNFT}
            >
              Upload
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NFT;
