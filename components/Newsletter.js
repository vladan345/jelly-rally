"use client";
import { useState } from "react";
import { newsletterSignUp } from "app/actions";

export default function Newsletter() {
   const [status, setStatus] = useState("idle"); // 'idle', 'pending', 'success', 'error'
   const [message, setMessage] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("pending");

      const formData = new FormData(e.target);
      const email = formData.get("email");

      try {
         const result = await newsletterSignUp({ email });
         if (result.status === 201) {
            setStatus("success");
            setMessage("Thank you for signing up!");
         } else {
            setStatus("error");
            setMessage(
               result.message || "Something went wrong. Please try again."
            );
         }
      } catch (error) {
         setStatus("error");
         setMessage("An unexpected error occurred. Please try again.");
      }
   };

   return (
      <div className="flex justify-center flex-col items-center h-[400px] bg-slate-200 rounded-xl my-8">
         <h2 className="mb-4">Sign up to our newsletter</h2>
         <form onSubmit={handleSubmit} className="flex gap-4">
            <input
               type="email"
               name="email"
               id="email"
               className="py-3 px-4 link flex-grow border-2 border-[--black] rounded-[--radius] w-80"
               required
               disabled={status === "pending"} // Disable input during submission
            />
            <button
               type="submit"
               data-cursor="pointer"
               className="py-3 link flex-grow border-2 px-4 border-[--black] rounded-[--radius] hover:border-[--accent] hover:text-[--accent] transition duration-500 tablet:w-1/2 w-full"
               disabled={status === "pending"} // Disable button during submission
            >
               {status === "pending" ? "Submitting..." : "Sign up"}
            </button>
         </form>
         {status === "success" && (
            <p className="text-green-600 mt-4">{message}</p>
         )}
         {status === "error" && <p className="text-red-600 mt-4">{message}</p>}
      </div>
   );
}
