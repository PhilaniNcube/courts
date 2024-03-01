"use client";

import { useFormStatus } from "react-dom";
import { ReactNode, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function SubmitButton({ children, className  }:{children: ReactNode, className?:string}) {
  const { pending } = useFormStatus();



  return (
    <Button type="submit" aria-disabled={pending} className={cn("", className)}>
      {pending ? "Wait..." : children}
    </Button>
  );
}
