"use client";

import React from "react";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";

export default function NewBlogPage() {
  return <BlogEditorForm isNew={true} />;
}
