export const CartLineNode = `
   fragment CartLineNode on CartLine {
      id
      quantity
      merchandise {
         ... on ProductVariant {
            id
            title
            image {
               url
            }
            product {
               title
               handle
               images(first: 10) {
                  edges {
                     node {
                        altText
                        url
                     }
                  }
               }
            }
            selectedOptions {
               name
               value
            }
            price {
               amount
               currencyCode
            }
         }
      }
   }
`;
