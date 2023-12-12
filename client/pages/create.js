import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { collectProductId } from "@/redux/counterSlice";
import { useRouter } from "next/router";
import { useMetaMask } from "metamask-react";
import Web3 from "web3";

const Create = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const router = useRouter();
  const { connect, status, account } = useMetaMask();
  const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "SVG"];

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    warranty: "",
    warrantyDuration: "",
    img_url: "",
  });
  const [file, setFile] = useState("");

  const handleImageChange = (file) => {
    setFile(file);
  };
  const [dropdown, setDropdown] = useState(false);
  const [activeItemId, setActiveItemId] = useState(null);

  const data = [
    {
      id: "@days",
      text: "Days",
    },
    {
      id: "@months",
      text: "Months",
    },
    {
      id: "@years",
      text: "Years",
    },
  ];

  const handleDropdown = () => {
    window.addEventListener("click", (w) => {
      if (w.target.closest(".dropdown-toggle")) {
        if (dropdown) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      } else {
        setDropdown(false);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "flipkartgrid");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/flipkartgrid/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage(file);
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://sepolia-testnet.io")
    );

    const usdToEth = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const priceInEth = productData.price / usdToEth.data.ethereum.inr;

    const requestData = {
      name: productData.name,
      description: productData.description,
      priceEth: priceInEth,
      price: productData.price,
      warranty: productData.warranty,
      warrantyDuration: productData.warrantyDuration,
      image: imageUrl,
      seller: account,
    };
    try {
      const response = await axios.post("/api/addProduct", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(collectProductId(response.data._id));

      if (response.status === 200) {
        toast.info("Proceed with NFT association!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${theme}`,
        });
        router.push("/nft");
      } else {
        toast.error("ERROR!! Try Again!", {
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
    } catch (error) {
      console.error(error);
    }
  };

  const isUploadDisabled = () => {
    return (
      !productData.name ||
      !productData.price ||
      !productData.warranty ||
      !productData.warrantyDuration ||
      !file
    );
  };

  // useEffect(() => {
  //   if (!account) {
  //     connect();
  //     console.log(connect());
  //   }
  //   // if (status === "notConnected") router.push("/");
  // }, []);

  // useEffect(() => {
  //   console.log(status);
  //   console.log(account);
  //   if (!account || status !== "connecting") router.push("/");
  // }, [status]);

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
            Create
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
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
                htmlFor="item-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Product Name"
                required
                name="name"
                onChange={handleInputChange}
              />
            </div>

            {/* <!-- Description --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Description
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                The description will be included on the {"item's"} detail page
                underneath its image. Markdown syntax is supported.
              </p>
              <textarea
                id="item-description"
                name="description"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows="4"
                required
                placeholder="Provide a detailed description of your item."
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* <!-- Price --> */}
            <div className="mb-6">
              <label
                htmlFor="item-price"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Price<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-price"
                name="price"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Price"
                required
                onChange={handleInputChange}
              />
            </div>

            {/* <!-- Warranty --> */}
            <div className="mb-6">
              <label
                htmlFor="item-warranty"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Warranty<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-warranty"
                name="warranty"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Warranty Life"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <div className="dropdown relative mb-4 cursor-pointer ">
                <div
                  className={
                    dropdown
                      ? "overlay h-[100vh] dropdown-toggle w-[100vw] fixed top-0 left-0 opacity-0 show bg-red z-40 cursor-default"
                      : "overlay h-[100vh] w-[100vw] fixed top-0 left-0 opacity-0 hidden bg-red z-40 cursor-default"
                  }
                  onClick={() => handleDropdown()}
                ></div>
                <div
                  className="dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 flex items-center justify-between rounded-lg border bg-white py-3.5 px-3 text-base dark:text-white"
                  onClick={() => handleDropdown()}
                >
                  <span className="flex items-center">
                    {activeItemId
                      ? productData.warrantyDuration
                      : "Select Duration"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 h-4 w-4 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                  </svg>
                </div>
                <div
                  className={
                    dropdown
                      ? "absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl show z-50"
                      : "absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden z-50"
                  }
                >
                  <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                    {data.map((item) => {
                      const { id, text } = item;
                      return (
                        <li key={id}>
                          <button
                            href="#"
                            className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                            onClick={() => {
                              setActiveItemId(id);
                              handleInputChange({
                                target: {
                                  name: "warrantyDuration",
                                  value: text,
                                },
                              });
                            }}
                          >
                            <span className="flex items-center space-x-3">
                              <span className="text-jacarta-700 dark:text-white">
                                {text}
                              </span>
                            </span>
                            {activeItemId === id && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="fill-accent mb-[3px] h-4 w-4"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                              </svg>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Submit --> */}
            <button
              disabled={isUploadDisabled()}
              className={
                isUploadDisabled()
                  ? "bg-accent-lighter rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  : "bg-accent rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
              }
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Create;
