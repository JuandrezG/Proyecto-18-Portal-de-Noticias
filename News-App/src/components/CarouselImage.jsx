import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";


function CarouselImage({ imgPath, title, id }) {
  return (
    <Link to={`/article/${id}`} className="p-4 flex flex-col items-center ">
      {/* <img src={imgPath} className="rounded-lg max-w-72"  />
      <h2 className="text-2xl font-bold max-h-16 overflow-hidden">{title}</h2> */}
      <Card />
    </Link>
  );
}

export default CarouselImage;
