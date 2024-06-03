import React from 'react';

export default function SuperUserAllDocumnetLayout({
    children,
}: {children: React.ReactNode}
){
    return (
        <div className="p-2 w-full">
            {children}
        </div>
    )
}
