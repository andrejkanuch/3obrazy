import React from "react";
import { Link } from "gatsby";

import GaleryStyles from "../gallery/gallery.module.scss";
let ImageProps=[];
export default function GalleryItem({ items, type, props }) {
  ImageProps=props;

  return Item(items, type);
}

function Item(items, type) {
  return items.map((item) => (
    <Link to={getPath(item, ImageProps)} key={item.id}>
      {Image(item)}
    </Link>
  ));
}

function Image(item) {
  return (
    <div className={GaleryStyles.element} key={item.id}>
      <img alt={item.location} src={item.image.file.url + "?w=530"} />
      {createTitle(item,ImageProps)}
    </div>
  )
}

function createTitle(item, props) {
  if (props.isCategory) {
    return (
      <span className={GaleryStyles.text}>{item.location.toUpperCase()}</span>
    )
  }
  else{
    return ""
  }
}

function getPath(item, ImageProps) {
  if (ImageProps.isCategory) {
    return `/search/${item.locationId}`;
  } else{
    return `/item/${item.id}`;
  }
}
