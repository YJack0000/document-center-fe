import React from 'react';

export default function SuperUserAllDocumnetLayout({
    children,
}: {children: React.ReactNode}
){
    return (
        <div className="mx-auto px-2 flex justify-center overflow-y-scroll">
            {children}
        </div>
    )
}
