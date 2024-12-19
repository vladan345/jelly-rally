"use client";

function DevTools() {
   return (
      <div className="w-60 rounded-[--radius] bg-white fixed right-4 bottom-4 shadow-md p-4">
         <button
            type="button"
            className="underline-link"
            onClick={() => {
               localStorage.removeItem("cart_object");
               location.reload();
            }}
         >
            Clear cart
         </button>
      </div>
   );
}

export default DevTools;
