"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { tags } from "@/utils/constants";

export default function TagFilter({ products }) {
   const searchParams = useSearchParams();
   const [currentTag, setCurrentTag] = useState(
      searchParams.get("tag") || "all"
   );

   const router = useRouter();

   const setFilter = (tag) => {
      const urlFriendlyTag = tag.toLowerCase().replace(" ", "-");
      router.push("?tag=" + urlFriendlyTag);
      setCurrentTag(urlFriendlyTag);
   };

   const allTags = [
      ...new Set(products.map((product) => product.node.tags).flat()),
   ];

   return (
      <div className="mb-4 flex gap-4">
         <button
            className={`p-2 border min-w-20 text-sm border-black rounded-md ${
               currentTag === "all" ? "bg-black text-white" : ""
            }`}
            onClick={() => setFilter("All")}
         >
            All
         </button>
         {allTags &&
            allTags.map((tag) => (
               <button
                  key={tag}
                  className={`p-2 border capitalize min-w-20 text-sm border-black rounded-md ${
                     currentTag === tag.toLowerCase().replace(" ", "-")
                        ? ` text-white`
                        : ""
                  }`}
                  style={{
                     backgroundColor:
                        currentTag === tag.toLowerCase().replace(" ", "-")
                           ? tags[tag]
                           : "",
                  }}
                  onClick={() => setFilter(tag)}
               >
                  {tag}
               </button>
            ))}
      </div>
   );
}
