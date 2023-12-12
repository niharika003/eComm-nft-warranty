import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useMetaMask } from "metamask-react";

const CategoryItem = () => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );
  const router = useRouter();
  const { account } = useMetaMask();
  return (
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
      {sortedtrendingCategoryItemData.map((item) => {
        console.log("Item: ", item);

        if (
          item.status === "sold" ||
          item.nft?.ownerNFT.toLowerCase() === account?.toLowerCase()
        )
          return;
        const {
          _id,
          image,
          name,
          price,
          timestamp,
          bidLimit,
          bidCount,
          likes,
          creator,
          owner,
        } = item;
        return (
          <article key={_id}>
            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <figure className="relative">
                <Link href={`${image}`} legacyBehavior>
                  <a>
                    <img
                      src={`${image}`}
                      alt="item 5"
                      className="w-full h-[230px] rounded-[0.625rem] object-cover"
                    />
                  </a>
                </Link>

                {/* <Likes like={likes} /> */}
              </figure>
              <div className="mt-7 flex items-center justify-between">
                <Link href={`/explore/${_id}`} legacyBehavior>
                  <a>
                    <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                      {name}
                    </span>
                  </a>
                </Link>
              </div>
              <div className="mt-2 text-sm">
                <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                  ₨. {price}
                </span>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  className="text-accent font-display text-sm font-semibold"
                  onClick={() => router.push(`/explore/${item._id}`)}
                >
                  Buy now
                </button>
                <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                  {timestamp?.slice(0, 10)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CategoryItem;
