"use client";

import DocumentRender from "@/components/documents/documentRender";

export default function Page({params} : {params: {documentId: string}}) {
  return (
    <DocumentRender documentId={params.documentId}/>
  )
}