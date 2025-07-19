import { Check } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export interface CheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    type="checkbox"
                    ref={ref}
                    className={cn(
                        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground appearance-none",
                        className
                    )}
                    {...props}
                />
                <Check className="absolute inset-0 h-4 w-4 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100" />
            </div>
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

