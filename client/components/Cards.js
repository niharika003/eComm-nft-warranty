import React, { useState, useContext, useEffect } from "react";
import Card from "./Card";

const Cards = () => {
  const styles = {
    container: `h-full w-full flex flex-col ml-[20px] mt-[50px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    cards: `flex items-center flex-wrap gap-[80px]`,
  };
  const assets = [
    {
      id: 0,
      attributes: {
        name: "Blue Abstract Painting",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "78",
      },
    },
    {
      id: 1,
      attributes: {
        name: "Modern Kitchen",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "135",
      },
    },
    {
      id: 2,
      attributes: {
        name: "Palm Trees",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "99",
      },
    },
    {
      id: 3,
      attributes: {
        name: "Cactus",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "62",
      },
    },
    {
      id: 4,
      attributes: {
        name: "Succulents",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "45",
      },
    },
    {
      id: 5,
      attributes: {
        name: "Cityscape",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "80",
      },
    },
    {
      id: 6,
      attributes: {
        name: "Black and White Abstract",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "65",
      },
    },
    {
      id: 7,
      attributes: {
        name: "Forest Sunset",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "90",
      },
    },
    {
      id: 8,
      attributes: {
        name: "Mountain Landscape",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "120",
      },
    },
    {
      id: 9,
      attributes: {
        name: "Abstract Artwork",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "75",
      },
    },
    {
      id: 10,
      attributes: {
        name: "Graffiti Wall",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "50",
      },
    },
    {
      id: 11,
      attributes: {
        name: "Vintage Car",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        price: "95",
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.cards}>
          {assets.map((item) => {
            let asset = item.attributes;

            return <Card key={item.id} item={asset} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
