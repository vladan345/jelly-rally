const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function ShopifyData(query, variables) {
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
