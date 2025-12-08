import type { JSX } from "react"
import type { PieLabelRenderProps } from "recharts"

export interface CategoryCount {
	category: string
	count: number
}

export interface CategoryPieChartProps extends React.HTMLAttributes<HTMLDivElement> {
	isAnimationActive?: boolean
	data: CategoryCount[]
	fill?: string
	showLabelLine?: boolean
	showLegend?: boolean
	pieColors?: string[]
	labelTextColor?: string
	labelFontSize?: string | number
	labelFontWeight?: string | number
	labelFontFamily?: string
	legendAlign?: "left" | "right" | "center"
	legendVerticalAlign?: "top" | "middle" | "bottom"
	legendLayout?: "horizontal" | "vertical"
	legendFontFamily?: string
	legendHeight?: number
	renderCustomLabel?: (props: PieLabelRenderProps) => JSX.Element
	renderLabelText?: (category: string, percent: number) => string
}
