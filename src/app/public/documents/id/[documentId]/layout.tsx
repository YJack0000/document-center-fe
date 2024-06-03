import React from 'react';

export default function SuperUserAllDocumnetLayout({
    children,
}: {children: React.ReactNode}
){
    return (
        <div className="p-8 w-full pt-2">
            {children}
        </div>
    )
}
