"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"
import useSWR from "swr"
import { format } from 'date-fns';

type FetchedCommentList = PagedWrapper<CommentDTO>

const PAGE_SIZE = 10

const postCommentFetcher = (url: string, documentId: string, content: string) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "documentId": documentId,
    "content": content
   })
}).then((res) => res.json())

function TextareaWithButton({documentId, updateCommentList}: {documentId: string, updateCommentList: () => void}) {
  const [comment, setComment] = useState("")

  const handleSetComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  };

  const handleAddComment = () => {
    postCommentFetcher('/api/comments', documentId, comment).then(() => {
      console.log('comment added')
      updateCommentList()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="grid w-full gap-2">
      <>
        <Textarea
          placeholder="請評論在這裡."
          onChange={handleSetComment}
        />
        <Button 
          onClick={handleAddComment}
          className="m-2 mb-8"
        > 送出評論
        </Button>
      </>
    </div>
  )
}

function CommentList({ comments }: { comments: FetchedCommentList | undefined }) {
  return (
    <div className="grid w-full gap-2">
      {comments?.data.map((comment) => (
        <Card key={comment.id}>
          <div className="flex justify-between p-2">
            <div>{comment.user.name}</div>
            <div className="text-gray-400">{format(new Date(comment.createAt), 'MM/dd/yyyy, hh:mm')}</div>
          </div>
          <CardContent className="p-2">
            <CardDescription>{comment.content}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const getCommentsFetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CommentBlock({documentId}: {documentId: string}) {

  const [pageIdx, setPageIdx] = useState(1);

  const { data: commentListResponse, isLoading, mutate: updateCommentList, error } 
      = useSWR<FetchedCommentList>(`/api/comments?page=${pageIdx}&limit=${PAGE_SIZE}&documentId=${documentId}`
                            , getCommentsFetcher);
  console.log(documentId)
    

  return (
    <Card className="w-[500px]">
      <CardHeader className="p-2 pb-0">
        <CardTitle className="text-base">建立評論</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid w-full items-center">
          <TextareaWithButton documentId={documentId} updateCommentList={updateCommentList}/>
          <CommentList comments={commentListResponse} />
        </div>
      </CardContent>
    </Card>
  )
}
