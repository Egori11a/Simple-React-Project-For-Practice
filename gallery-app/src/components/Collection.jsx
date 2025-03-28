import React from "react";

const Collection = ({ name, images }) => (
    <div className="collection">
        <img className="collection__big" src={images[0]} alt="Item" />
        <div className="collection__bottom">
            {images.slice(1, 4).map((img, i) => (
                <img key={i} className="collection__mini" src={img} alt="Item" />
            ))}
        </div>
        <h4>{name}</h4>
    </div>
);

export default Collection;