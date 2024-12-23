import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopProvider from "context/shopContext";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <title>Ecom43</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </head>
         <body>
            <ShopProvider>
               <main>
                  <Header />
                  {children}
                  <Footer />
               </main>
            </ShopProvider>
         </body>
      </html>
   );
}
