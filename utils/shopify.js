import { CartLineNode } from "./cartFragment";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query, variables) {
   const URL = `https://${domain}/api/2024-10/graphql.json`;

   const options = {
      endpoint: URL,
      method: "POST",
      headers: {
         "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
   };

   try {
      const data = await fetch(URL, options).then((response) => {
         return response.json();
      });
      return data;
   } catch (error) {
      throw new Error("Products not fetched", error);
   }
}

export async function getAllProducts() {
   const query = `
      {
         products(first: 25) {
            edges {
               node {
                  id
                  title
                  handle
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

   const response = await ShopifyData(query);

   const allProducts = response.data.products.edges
      ? response.data.products.edges
      : [];
   return allProducts;
}

export const getProduct = async (handle) => {
   const productQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
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

export async function generateNewCart(itemId, quantity) {
   const query = `
     ${CartLineNode}
      mutation cartCreate($cartInput: CartInput) {
         cartCreate(input: $cartInput) {
            cart {
               id
               checkoutUrl
               lines(first: 100) {
                  edges {
                     node {
                        ...CartLineNode
                     }
                  }
               }
            }
         }
      }
   `;
   const variables = {
      cartInput: {
         lines: [{ merchandiseId: itemId, quantity: quantity }],
      },
   };
   const response = await ShopifyData(query, variables);
   console.log(response);
   const cartObject = response.data.cartCreate.cart
      ? response.data.cartCreate.cart
      : [];
   return cartObject;
}

export async function cartAddItem(id, item) {
   console.log(item);
   const query = `
      ${CartLineNode}
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
         cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
               id
               checkoutUrl
               lines(first: 100) {
                  edges {
                     node {
                        ...CartLineNode
                     }
                  }
               }
            }
         }
      }
   `;
   const variables = {
      cartId: id,
      lines: [{ merchandiseId: item.id, quantity: item.quantity }],
   };
   const response = await ShopifyData(query, variables);

   const checkout = response.data.cartLinesAdd.cart
      ? response.data.cartLinesAdd.cart
      : [];

   return checkout;
}
export async function cartRemoveItem(id, itemId) {
   const query = `
      ${CartLineNode}
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
         cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
               id
               checkoutUrl
               lines(first: 100) {
                  edges {
                     node {
                        ...CartLineNode
                     }
                  }
               }
            }
         }
      }
   `;
   const variables = {
      cartId: id,
      lineIds: [itemId],
   };
   const response = await ShopifyData(query, variables);

   const checkout = response.data.cartLinesRemove.cart
      ? response.data.cartLinesRemove.cart
      : [];

   return checkout;
}

export async function updateCheckout(id, lineItems) {
   const lineItemsObject = lineItems.map((item) => {
      return {
         id: item.id,
         quantity: item.variantQuantity,
      };
   });
   const query = `
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
     cartLinesUpdate(cartId: $cartId, lines: $lines) {
       cart {
         id
         checkoutUrl
         lines(first: 100) {
           edges {
             node {
               id
               quantity
               merchandise {
                 ... on ProductVariant {
                   title
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
      cartId: id,
      lines: [...lineItemsObject],
   };

   const response = await ShopifyData(query, variables);
   console.log(response);
   const checkout = response.data.cartLinesUpdate.cart
      ? response.data.cartLinesUpdate.cart
      : [];

   return checkout;
}
