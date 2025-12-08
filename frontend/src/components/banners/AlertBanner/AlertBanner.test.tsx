import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AlertBanner } from "~/components"

describe("AlertBanner", () => {
	it("renders the AlertBanner component", () => {
		render(<AlertBanner />)

		const container = screen.getByTestId("alert-banner")
		expect(container).toBeInTheDocument()
	})
})
