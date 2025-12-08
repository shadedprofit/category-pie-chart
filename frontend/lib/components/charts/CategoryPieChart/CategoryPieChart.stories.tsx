import type { StoryFn, Meta } from "@storybook/react"
import type { CategoryCount } from "../../../interfaces"
import { CategoryPieChart } from "../CategoryPieChart"

export default {
	title: "Components/Charts/CategoryPieChart",
	component: CategoryPieChart
} as Meta<typeof CategoryPieChart>

const Template: StoryFn<typeof CategoryPieChart> = args => (
	<CategoryPieChart {...args} />
)
const EXAMPLE_DATA: CategoryCount[] = [
	{ category: "Accessories", count: 175 },
	{ category: "Tshirts", count: 148 },
	{ category: "Pants", count: 137 },
	{ category: "Sweatshirts", count: 122 },
	{ category: "Shoes", count: 110 }
]
const ALT_PIE_COLORS: string[] = [
	"#003f5c",
	"#58508d",
	"#bc5090",
	"#ff6361",
	"#ffa600"
]

export const CategoryPieChartDefaultTest = Template.bind({})
CategoryPieChartDefaultTest.args = {
	title: "Default Configuration",
	data: EXAMPLE_DATA
}

export const CategoryPieChartWithUserColorsTest = Template.bind({})
CategoryPieChartWithUserColorsTest.args = {
	title: "With User's Own Pie Colors",
	data: EXAMPLE_DATA,
	pieColors: ALT_PIE_COLORS
}

export const CategoryPieChartChangeLabelStyleTest = Template.bind({})
CategoryPieChartChangeLabelStyleTest.args = {
	title: "With User's Own Label Style",
	data: EXAMPLE_DATA,
	labelTextColor: "black",
	labelFontSize: 14,
	labelFontWeight: 700,
	labelFontFamily: "Arial"
}

export const CategoryPieChartLegendAlignmentTest = Template.bind({})
CategoryPieChartLegendAlignmentTest.args = {
	title: "With Different Legend Alignment",
	data: EXAMPLE_DATA,
	legendAlign: "center",
	legendLayout: "horizontal",
	legendVerticalAlign: "bottom"
}
