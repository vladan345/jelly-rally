import { ShopifyAdminData, ShopifyData } from "./shopify";

export async function newsletterQuery(email) {
   const query = `
     mutation CreateCustomer($input: CustomerInput!) {
       customerCreate(input: $input) {
         customer {
           id
           email
           emailMarketingConsent {
             marketingState
           }
         }
         userErrors {
           field
           message
         }
       }
     }
   `;

   const variables = {
      input: {
         email: email,
         emailMarketingConsent: {
            marketingOptInLevel: "SINGLE_OPT_IN",
            marketingState: "SUBSCRIBED",
            consentUpdatedAt: new Date().toISOString(),
         },
      },
   };

   try {
      const response = await ShopifyAdminData(query, variables);

      if (response.data.customerCreate.userErrors.length === 0) {
         const marketingState =
            response.data.customerCreate.customer.emailMarketingConsent
               .marketingState;
         if (marketingState === "SUBSCRIBED") {
            return { message: "Customer successfully subscribed", status: 201 };
         } else {
            return {
               message: "Customer added but not subscribed",
               status: 400,
            };
         }
      } else {
         const errors = response.data.customerCreate.userErrors
            .map((error) => error.message)
            .join(", ");
         return { message: errors, status: 400 };
      }
   } catch (error) {
      return { message: "Failed to create customer", status: 500 };
   }
}
