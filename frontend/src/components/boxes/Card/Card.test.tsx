import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Card } from "~/components"

describe("Card", () => {
	it("renders the Card component", () => {
		render(
			<Card>
				<div>Content</div>
			</Card>
		)

		const container = screen.getByTestId("card")
		expect(container).toBeInTheDocument()
	})
})
