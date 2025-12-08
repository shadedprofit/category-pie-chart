import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { LoadingSpinner } from "~/components"

describe("LoadingSpinner", () => {
	it("renders the LoadingSpinner component", () => {
		render(<LoadingSpinner />)

		const container = screen.getByTestId("loading-spinner")
		expect(container).toBeInTheDocument()
	})
})
