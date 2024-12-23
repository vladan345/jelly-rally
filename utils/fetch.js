import { ShopifyData } from "./shopify";

export async function getAllProductTags() {
   const query = `
      {
         products(first: 250) {
            edges {
               node {
                  id
                  tags
               }
            }
         }
      }
   `;

   const response = await ShopifyData(query);

   const allProducts = response.data.products.edges
      ? response.data.products.edges
      : [];
   return allProducts;
}
export async function getProducts(count) {
   const query = `
      query getProducts($count: Int!) {
         products(first: $count) {
            edges {
               node {
                  id
                  title
                  handle
                  tags
                  priceRange {
                     minVariantPrice {
                        amount
                        currencyCode
                     }
                  }
                  images(first: 5) {
                     edges {
                        node {
                           url
                           altText
                        }
                     }
                  }
               }
            }
         }
      }
   `;

   const variables = {
      count,
   };

   const response = await ShopifyData(query, variables);

   const filteredProducts = response.data.products.edges
      ? response.data.products.edges
      : [];
   return filteredProducts;
}
export async function getCollection(collectionUrl) {
   const query = `
      query getCollection($collectionUrl: String!) {
         collection(handle: $collectionUrl) {
            products(first: 250) {
               edges {
                  node {
                     id
                     title
                     handle
                     tags
                     priceRange {
                        minVariantPrice {
                           amount
                           currencyCode
                        }
                     }
                     images(first: 5) {
                        edges {
                           node {
                              url
                              altText
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   `;

   const variables = {
      collectionUrl,
   };

   const response = await ShopifyData(query, variables);

   const collectionProducts = response.data.collection.products.edges
      ? response.data.collection.products.edges
      : [];
   return collectionProducts;
}
export async function getFilteredProducts(tag) {
   const query = `
      query getFilteredProducts($query: String) {
         products(first: 250, query: $query) {
            edges {
               node {
                  id
                  title
                  handle
                  tags
                  priceRange {
                     minVariantPrice {
                        amount
                        currencyCode
                     }
                  }
                  images(first: 5) {
                     edges {
                        node {
                           url
                           altText
                        }
                     }
                  }
               }
            }
         }
      }
   `;

   const variables = {
      query: tag === "all" || !tag ? null : `tag:${tag}`,
   };

   const response = await ShopifyData(query, variables);

   const filteredProducts = response.data.products.edges
      ? response.data.products.edges
      : [];
   return filteredProducts;
}

export const getProduct = async (handle) => {
   const productQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            weight
            weightUnit
            selectedOptions {
              name
              value
            }
            image {
              altText
              url
            }
            availableForSale
            price {
              amount
              currencyCode
            }
            product {
              handle
              title
            }
          }
        }
      }
      options {
        name
        values
        id
      }
    }
  }
  `;

   const variables = {
      handle,
   };
   try {
      const { data } = await ShopifyData(productQuery, variables);
      return data.product;
   } catch (error) {
      throw new Error(error);
   }
};
