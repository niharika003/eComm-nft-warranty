/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import HeadLine from "@/components/HeadLine";
import Collection_dropdown2 from "@/components/dropdown/collection_dropdown2";
import Explore_collection_item from "@/components/collections/explore_collection_item";
// import { collectCollectionData } from "@/redux/counterSlice";
import axios from "axios";
import Recently_added_dropdown from "@/components/dropdown/recently_added_dropdown";
const sortText = [
  {
    id: 1,
    text: "Recently Added",
  },
  {
    id: 2,
    text: "Price: Low to High",
  },
  {
    id: 3,
    text: "Price: high to low",
  },
];
const Explore_collection = () => {
  // const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   dispatch(collectCollectionData(collectionFilteredData.slice(0, 8)));
  // }, [dispatch, collectionFilteredData]);

  return (
    <>
      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="/gradient_light.jpg" alt="gradient" className="h-full" />
        </picture>

        <div className="container">
          <HeadLine
            text="Explore Collections"
            classes="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"
          />

          {/* <!-- Filter --> */}
          <div className="mb-8 flex flex-wrap items-start justify-between">
            <Recently_added_dropdown
              data={sortText}
              dropdownFor="recently_added"
            />
          </div>

          {/* <!-- Grid --> */}
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
            <Explore_collection_item itemFor="explore-collection" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Explore_collection;
