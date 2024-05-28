import React from 'react';

export default function SuperUserAllDocumnetLayout({
    children,
}: {children: React.ReactNode}
){
    return (
        <div className="mx-auto flex justify-center">
            {children}
        </div>
    )
}
