import * as React from "react";
import GoogleIcon from "@/components/icon/GoogleIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Document Center</CardTitle>
        <CardDescription>Choose login method</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full p-2"
          onClick={() => {
            router.push("https://document-center.cerana.tech/api/auth/google");
          }}
        >
          <GoogleIcon />
          <span className="ml-2">Login with Google</span>
        </Button>
      </CardContent>
    </Card>
  );
}
