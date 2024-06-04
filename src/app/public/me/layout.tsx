import React from 'react';

export default function SuperUserAllDocumnetLayout({
    children,
}: { children: React.ReactNode }
) {
    return (
        <div className="mx-auto px-2 flex justify-center">
            <div className="w-full min-w-[1000px] my-12">
                {children}
            </div>
        </div>
    )
}
