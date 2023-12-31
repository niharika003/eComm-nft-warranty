import React from "react";
import Cards from "./Cards";

const MainSection = () => {
  const styles = {
    container: `h-full w-full flex flex-col overflow-hidden`,
    recentTitle: `text-2xl font-bold text-center mb-[20px] text-center mt-[40px]`,
    recentTransactionsList: `flex flex-col`,
    transactionCard: `flex justify-between mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl`,
  };

  return (
    <div className={styles.container}>
      <Cards />
    </div>
  );
};

export default MainSection;
