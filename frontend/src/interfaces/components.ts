import type { JSX } from "react"
import type { PieLabelRenderProps } from "recharts"
import type { CategoryCount } from "~/interfaces"

export interface CategoryPieChartProps extends React.HTMLAttributes<HTMLDivElement> {
    isAnimationActive?: boolean
    data: CategoryCount[]
    fill?: string
    textColor?: string
    pieColors?: string[]
    renderCustomLabel?: (props: PieLabelRenderProps) => JSX.Element
}

export interface CategoryPieChartDateFormProps extends React.HTMLAttributes<HTMLFormElement> {
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}