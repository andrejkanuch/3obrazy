module.exports = {
  siteMetadata: {
    title: `3Obrazy`,
    description: `Skurveny projektik na ktorom sa pracuje s dzbanikom vinka v jednej ruke`,
    author: `Andrej Kanuch & Samuel Stolicny`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `roboto\:300,400,400i,700`,
          ],
        display: 'swap'
      }
    },
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: `2wacyqz6lvrv`,
          // Learn about environment variables: https://gatsby.dev/env-vars
          accessToken: `YsDo3liiROb5zHxpQRnOR_L91ilUnS_Uv6fiyidFyRc`,
        },
      },
  ]
}
