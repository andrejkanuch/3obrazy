// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
  
    // Query for markdown nodes to use in creating pages.
    const result = await graphql(
      `
      {
        allContentfulObraz {
          nodes {
            id
            image {
              file {
                url
              }
            }
            location
            name
            price
            size {
              options {
                size
              }
            }
          }
        }
        allContentfulLocations {
          nodes {
            location
            locationId
            id
          }
        }
      }
      `
    )
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    const productTemplate = path.resolve(`src/templates/product.jsx`)
    result.data.allContentfulObraz.nodes.forEach(node => {
      const path = '/item/'+node.id;
      createPage({
        path,
        component: productTemplate,
        context: {
          pagePath: path,
          node:node
        },
      })
    });

    const searchPostTemplate = path.resolve(`src/pages/search.jsx`)
    result.data.allContentfulLocations.nodes.forEach(node => {
      items=result.data.allContentfulObraz.nodes;
      const path = '/search/'+node.locationId;
      createPage({
        path,
        component: searchPostTemplate,
        context: {
          pagePath: path,
          locationId:node.locationId
        },
      })
    })
  }

  exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    })
  }

  exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
    const config = getConfig()
    if (stage.startsWith('develop') && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom': '@hot-loader/react-dom'
      }
    }
  }