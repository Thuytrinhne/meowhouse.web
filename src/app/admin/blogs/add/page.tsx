// import libs
import React from "react";

// import components
import FormBody from "../form-body";

// import data
import { PAGE_DATA } from "@/data/admin";

export default async function AdminBlogAddPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="w-fit">{PAGE_DATA["blog-add"]}</h1>
      <FormBody data={[]} />
    </div>
  );
}
