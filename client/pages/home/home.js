import React from "react";
import Hero from "@/components/hero/hero";
import Trending_category from "@/components/categories/trending_categories";
import TransactionTable from "@/components/TransactionTable";
import HeadLine from "@/components/HeadLine";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { isConnected } = useSelector((state) => state.counter);
  console.log(isConnected);
  return (
    <main>
      <Hero />
      <Trending_category />
      <div className="container">
        <HeadLine
          text="Recent Transactions"
          xLink="activity"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />
        <TransactionTable />
      </div>
    </main>
  );
};

export default HomePage;
