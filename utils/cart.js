import { ShopifyData } from "./shopify";
import { CartLineNode } from "./cartFragment";

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
   const cartObject = response.data.cartCreate.cart
      ? response.data.cartCreate.cart
      : [];
   return cartObject;
}

export async function cartAddItem(id, item) {
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
   const checkout = response.data.cartLinesUpdate.cart
      ? response.data.cartLinesUpdate.cart
      : [];

   return checkout;
}
