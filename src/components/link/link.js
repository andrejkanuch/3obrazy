import React from "react";
export default function Link(item,key) 
    {return <a href={item.url} key={key} target="_blank" rel="noreferrer"><i aria-label={item.name} className={"icon-"+item.name}></i></a>}