"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import Link from "next/link"
import Image from "next/image"


export const PreviewLink = ({ href, src, title }: { title: string, href: string, src: string }) => {
  return (
    <HoverCardPrimitive.Root openDelay={100} closeDelay={50}>
      <HoverCardPrimitive.Trigger asChild>
        <Link
          href={href}
          rel="noopener"
          className="max-md:mt-1 w-fit underline decoration-1 underline-offset-2 transition-colors decoration-primary hover:decoration-secondary"
        >
          {title}
        </Link>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          align="center"
          side="right"
          sideOffset={12}
          className="z-50 group w-[200px] origin-[--radix-hover-card-content-transform-origin]  h-[120px] rounded bg-primary  outline-none data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade after:absolute after:inset-0 after:rounded after:shadow-[inset_0px_0px_0px_0.5px_rgba(19,20,20,0.1)]"
          style={{
            boxShadow: "0px 2px 3px -1.5px rgba(0, 0, 0, 0.03), 0px 4px 6px 0px rgba(0, 0, 0, 0.03), 0px 8px 12px 0px rgba(0, 0, 0, 0.03), 0px 8px 24px 0px rgba(0, 0, 0, 0.03), 0px 32px 48px 0px rgba(0, 0, 0, 0.03)"
          }}
        >
          <HoverCardPrimitive.Arrow height={6} width={8} className="fill-[--border-tertiary]" />
          <Image quality={100} src={src} alt="" width={200} height={120} className="rounded max-w-full max-h-full object-cover" />
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>

    </HoverCardPrimitive.Root>
  )
}
