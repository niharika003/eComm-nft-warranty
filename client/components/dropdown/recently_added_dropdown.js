import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import { updatetrendingCategorySorText } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";

const Recently_added_dropdown = ({ data, dropdownFor }) => {
  const dispatch = useDispatch();
  const [sortActive, setsortActive] = useState(1);
  const [sortFilterText, setSortFilterText] = useState("");

  useEffect(() => {
    dispatch(updatetrendingCategorySorText(sortFilterText));
  }, [sortFilterText, dispatch]);

  if (dropdownFor === "recently_added") {
    return (
      <div>
        {/* dropdown */}
        <div className="dropdown relative my-1 cursor-pointer">
          <Tippy
            animation="fade"
            arrow={false}
            trigger="click"
            interactive="true"
            placement="bottom"
            className="tooltip-container"
            content={
              <div
                className="dropdown-menu dark:bg-jacarta-800 z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl show text-jacarta-500"
                aria-labelledby="categoriesSort"
              >
                <span className="font-display text-jacarta-300 block px-5 py-2 text-sm font-semibold">
                  Sort By
                </span>
                {data.map((item) => {
                  const { id, text } = item;
                  return (
                    <button
                      key={id}
                      className="dropdown-item font-display text-jacarta-700 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                      onClick={() => {
                        setsortActive(id);
                        setSortFilterText(text);
                      }}
                    >
                      {text}
                      {sortActive === id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="fill-accent mb-[3px] h-4 w-4"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            }
          >
            <div className="dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 inline-flex w-48 items-center justify-between rounded-lg border bg-white py-2 px-3 text-sm dark:text-white">
              <span className="font-display">Trending</span>
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
          </Tippy>
        </div>
      </div>
    );
  }
};

export default Recently_added_dropdown;
