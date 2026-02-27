"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={classNames}
      components={{
        Chevron: ({ orientation, ...rest }: { orientation?: string } & React.SVGProps<SVGSVGElement>) => {
          if (orientation === "left") {
            return <ChevronLeft className="h-4 w-4" {...rest} />;
          }
          return <ChevronRight className="h-4 w-4" {...rest} />;
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
