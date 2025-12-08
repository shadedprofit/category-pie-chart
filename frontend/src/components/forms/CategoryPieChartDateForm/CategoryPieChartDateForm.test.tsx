import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { CategoryPieChartDateForm } from "~/components"
import { renderWithQueryClient } from "~/utils/testUtils"

describe("CategoryPieChartDateForm", () => {
	it("renders the CategoryPieChartDateForm component", () => {
		renderWithQueryClient(<CategoryPieChartDateForm />)

		const container = screen.getByTestId("category-pie-chart-date-form")
		expect(container).toBeInTheDocument()
	})
})
