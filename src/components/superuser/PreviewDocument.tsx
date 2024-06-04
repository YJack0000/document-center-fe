import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import MarkdownPreview from '@uiw/react-markdown-preview';
import remarkGfm from 'remark-gfm'

export default function PreviewDocument({ documentTitle, documentContent } 
: { documentTitle: string, documentContent: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">{documentTitle}</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[500px] overflow-y-auto max-w-[800px] overflow-x-auto">
                <DialogHeader>
                    <DialogTitle>{documentTitle}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <MarkdownPreview
                        remarkPlugins={[remarkGfm]}
                        source={documentContent}
                        className='markdown-list'
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
