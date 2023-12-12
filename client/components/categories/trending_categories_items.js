import React, { useEffect, useState } from "react";
import { trendingCategoryData } from "../../data/categories_data";
import CategoryItem from "./categoryItem";
import { useDispatch } from "react-redux";
import { updateTrendingCategoryItemData } from "../../redux/counterSlice";
import Recently_added_dropdown from "../dropdown/recently_added_dropdown";
import axios from "axios";

const Trending_categories_items = () => {
  const [itemdata, setItemdata] = useState(trendingCategoryData);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setItemdata(response.data);
        response.data.sort((a, b) => {
          // Assuming timestamp attribute name is "timestamp"
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampB - timestampA;
        });
        // console.log(response);
      })
      .catch((error) => console.error(error));
  }, []);
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

  useEffect(() => {
    dispatch(updateTrendingCategoryItemData(itemdata.slice(0, 4)));
  }, [itemdata, dispatch]);

  return (
    <>
      {/* <!-- Filter --> */}
      <div className="mb-8 flex flex-wrap items-center justify-between">
        {/* dropdown */}
        <Recently_added_dropdown data={sortText} dropdownFor="recently_added" />
      </div>

      {/* <!-- Grid --> */}
      <CategoryItem />
    </>
  );
};

export default Trending_categories_items;
