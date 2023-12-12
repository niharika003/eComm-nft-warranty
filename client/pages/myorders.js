import HeadLine from "@/components/HeadLine";
import Explore_collection_item from "@/components/collections/explore_collection_item";
import Collection_dropdown2 from "@/components/dropdown/collection_dropdown2";
import React from "react";

const myorders = () => {
  return (
    <>
      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="/gradient_light.jpg" alt="gradient" className="h-full" />
        </picture>

        <div className="container">
          <HeadLine
            text="My Products"
            classes="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"
          />

          {/* <!-- Filter --> */}
          <div className="mb-8 flex flex-wrap items-start justify-between">
            <Collection_dropdown2 />
          </div>

          {/* <!-- Grid --> */}
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
            <Explore_collection_item itemFor="myorders" />
          </div>
        </div>
      </section>
    </>
  );
};

export default myorders;
