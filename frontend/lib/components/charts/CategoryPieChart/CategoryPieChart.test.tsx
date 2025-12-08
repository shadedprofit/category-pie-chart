import { render, screen } from "@testing-library/react"
import { CategoryPieChart } from "lib/index"
import { describe, it, expect } from "vitest"

describe("CategoryPieChart", () => {
	it("renders the CategoryPieChart component", () => {
		render(
			<div data-testid="category-pie-chart">
				<CategoryPieChart data={[{ category: "Tshirts", count: 9 }]} />
			</div>
		)

		const container = screen.getByTestId("category-pie-chart")
		expect(container).toBeInTheDocument()
	})
})
