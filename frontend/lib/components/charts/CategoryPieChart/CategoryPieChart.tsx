import React from "react"
import { COLORS, RADIAN } from "lib/constants"
import type { CategoryPieChartProps } from "lib/interfaces"
import { Cell, Pie, PieChart, Legend, type PieLabelRenderProps } from "recharts"

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
	isAnimationActive = true,
	data = [],
	className,
	style,
	fill = "#8884d8",
	pieColors = COLORS,
	labelTextColor = "white",
	showLabelLine = false,
	showLegend = true,
	labelFontFamily = "Arial",
	labelFontSize = 11,
	labelFontWeight = 650,
	legendAlign = "right",
	legendLayout = "vertical",
	legendVerticalAlign = "middle",
	legendFontFamily = "Arial",
	legendHeight = 36,
	renderCustomLabel,
	renderLabelText
}): React.ReactElement => {
	const pieData = data as unknown as Record<string, unknown>[]
	const renderCategoryLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent = 0,
		name = ""
	}: PieLabelRenderProps): React.ReactElement | null => {
		if (
			cx == null ||
			cy == null ||
			innerRadius == null ||
			outerRadius == null
		) {
			return null
		}
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5
		const ncx = Number(cx)
		const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
		const ncy = Number(cy)
		const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN)
		const categoryLabel = `${((percent ?? 1) * 100).toFixed(0)}%`

		return (
			<text
				x={x}
				y={y}
				fill={labelTextColor}
				textAnchor={x > ncx ? "start" : "end"}
				dominantBaseline="central"
				fontSize={labelFontSize}
				fontFamily={labelFontFamily}
				fontWeight={labelFontWeight}
			>
				{renderLabelText
					? renderLabelText(name, percent)
					: categoryLabel}
			</text>
		)
	}
	return (
		<PieChart
			style={{
				width: "100%",
				maxWidth: "500px",
				maxHeight: "80vh",
				aspectRatio: 1,
				...style
			}}
			className={className}
			responsive
		>
			<Pie
				data={pieData}
				labelLine={showLabelLine}
				label={renderCustomLabel || renderCategoryLabel}
				fill={fill}
				dataKey="count"
				nameKey="category"
				isAnimationActive={isAnimationActive}
			>
				{data.map((entry, index) => (
					<Cell
						key={`cell-${entry.category}`}
						fill={pieColors[index % pieColors.length]}
					/>
				))}
				{showLegend ? (
					<Legend
						align={legendAlign}
						verticalAlign={legendVerticalAlign}
						height={legendHeight}
						layout={legendLayout}
						fontFamily={legendFontFamily}
					/>
				) : null}
			</Pie>
		</PieChart>
	)
}
