import type { JSX } from "react"
import type { PieLabelRenderProps } from "recharts"
import type { CategoryCount } from "~/interfaces"

export interface CategoryPieChartProps extends React.HTMLAttributes<HTMLDivElement> {
	isAnimationActive?: boolean
	data: CategoryCount[]
	fill?: string
	labelLine?: boolean
	textColor?: string
	pieColors?: string[]
	renderCustomLabel?: (props: PieLabelRenderProps) => JSX.Element
}

export interface CategoryPieChartDateFormProps extends React.HTMLAttributes<HTMLFormElement> {
	onClose?: () => void
	onFetchError?: (errMessage: string) => void
}

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
	type?: "info" | "alert" | "success" | "warning"
	title?: string
	message?: string
	onClose?: () => void
}
