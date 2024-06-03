"use client";

import DocumentRender from "@/components/documents/document-render";

export default function Page({params} : {params: {documentId: string}}) {
  return (
    <DocumentRender documentId={params.documentId}/>
  )
}