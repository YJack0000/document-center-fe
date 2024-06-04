"use client"

import MarkdownPreview from '@uiw/react-markdown-preview';
import remarkGfm from 'remark-gfm'
import '../index.css';
import CommentBlock from './commentBlock';
import useSWR from 'swr';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DocumentRender({documentId}: {documentId: string}) {
    const { data: documentInfo, isLoading, error } = useSWR<DocumentDTO>(`/api/documents/${documentId}`, fetcher);

    return (
        <div className="flex">
            {isLoading ? <div>Loading...</div>
            : 
            <>
                <div className="w-4/5">
                    <h1 className="text-xl font-bold my-4 bg-gray-100 p-2">{`${documentInfo?.title}`}</h1>
                    {/* <h2 className="text-ms my-2">{`文件編號: ${documentInfo?.id}`}</h2> */}
                    

                    <div id="Document" className='p-2 w-4/5 min-w-[700px]'>
                        <MarkdownPreview
                            wrapperElement={{
                                "data-color-mode": "light"
                            }}
                            remarkPlugins={[remarkGfm]}
                            source={documentInfo?.content}
                            className='markdown-list min-w-[700px] max-w-[800px]'
                        />
                    </div>

                    <br />
                    <h1 id="Comment" className="text-xl font-bold my-4">評論區</h1>
                    <CommentBlock documentId={documentId} />
                </div>
                <nav className="w-1/5 p-4">
                    
                    <div className="h-10 text-xl">目錄</div>
                    
                    <ul>
                        <li key={"table-of-contents"}>
                            <a className="text-gray-400 hover:text-gray-700 focus:text-gray-700" href="#Document">文件</a> <br />
                            <a className="text-gray-400 hover:text-gray-700 focus:text-gray-700" href="#Comment">評論區</a>
                        </li>
                    </ul>
                </nav>
             </>
             }
         </div>

    );
}
