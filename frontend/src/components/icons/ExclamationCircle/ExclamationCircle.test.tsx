import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ExclamationCircle } from "~/components"

describe("ExclamationCircle", () => {
	it("renders the ExclamationCircle component", () => {
		render(<ExclamationCircle />)

		const container = screen.getByTestId("exclamation-circle")
		expect(container).toBeInTheDocument()
	})
})
