import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Button } from "~/components"

describe("Button", () => {
	it("renders the Button component", () => {
		render(<Button>Submit</Button>)

		const container = screen.getByTestId("button")
		expect(container).toBeInTheDocument()
	})
})
