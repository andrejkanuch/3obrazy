import React from "react";

import GalleryItem from "../gallery-item/gallery-item";

import GaleryStyles from "./gallery.module.scss";

export default function Gallery({headerText,items,type, ...props}) {
  return (
    <div className={GaleryStyles.gallery}>
      {displayHeader(headerText)}
      <div className={GaleryStyles.gallerycontainer}>
        <GalleryItem items={items} type={type} props={props}></GalleryItem>
      </div>
    </div>
  );

  function displayHeader(headerText) {
    if (headerText) {
      return (
        <div className={GaleryStyles.header}>
          <p>{headerText}</p>
        </div>
      );
    }
  }
}
