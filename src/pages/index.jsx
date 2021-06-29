import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout/layout";
import Link from "../components/link/link";
import Gallery from "../components/gallery/gallery";

import "../styles/home.scss";

export default function Home(props) {
  const data = useStaticQuery(graphql`
    {
      allContentfulLocations {
        nodes {
          id
          image {
            file {
              url
            }
          }
          location
          locationId
        }
      }
      allContentfulObraz {
        nodes {
          author
          id
          image {
            file {
              url
            }
            title
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <div className="home-page">
        <div className="main-screen">
          <div className="socialMedia-buttons container">
            {socialButtons.map((item, key) => Link(item, key))}
            <div className="icon-scroll"></div>
          </div>
        </div>
        <Gallery
          items={data.allContentfulLocations.nodes}
          headerText="Lokality"
          type={"location"}
          props={props}
          isCategory={true}
        ></Gallery>
        <Gallery
          items={data.allContentfulObraz.nodes}
          headerText="Novinky"
          type={"single"}
          props={props}
          isCategory={false}
        ></Gallery>
      </div>
    </Layout>
  );
}
const socialButtons = [
  { name: "facebook", url: "https://www.facebook.com/andrej.mckanuch" },
  { name: "instagram", url: "https://www.instagram.com/andrejkanuch/" },
  { name: "pinterest", url: "https://www.instagram.com/andrejkanuch/" },
  { name: "tweeter", url: "https://www.instagram.com/andrejkanuch/" },
];
