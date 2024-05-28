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

export default function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Document Center</CardTitle>
        <CardDescription>Choose login method</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full p-2">
          <GoogleIcon />
          <span className="ml-2">Login with Google</span>
        </Button>
      </CardContent>
    </Card>
  );
}
