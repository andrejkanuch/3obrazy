import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/layout";
import Gallery from "../components/gallery/gallery";


import "../styles/search-page.scss";

function Search({ data, location }) {
  return (
    <Layout>
      <div className="search-page">
        <Gallery
          items={data.allContentfulObraz.nodes}
          headerText="Obrazy"
          type={"single"}
          props={location}
          isCategory={false}
        ></Gallery>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query MyQuery($locationId: String) {
    allContentfulObraz(filter: { location: { eq: $locationId } }) {
      nodes {
        id
        name
        location
        price
        author
        image {
          file {
            url
          }
        }
      }
    }
  }
`;

export default Search;
