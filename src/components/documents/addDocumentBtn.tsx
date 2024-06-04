import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonWithIcon() {
    const router = useRouter();
    const handleClick = async () => {
        const res = await fetch(`/api/documents/me`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "全新的文件",
                content: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
            }),
        });
        const { id } = await res.json();
        router.push(`/documents/${id}/edit`);
    };
    return (
        <Button onClick={handleClick}>
            <CirclePlus className="mr-2 h-4 w-4" /> 新增文件
        </Button>
    );
}
