import { render } from "@testing-library/react"
import type { ReactNode } from "react"
import { QCTestProvider } from "~/providers"

export const renderWithQueryClient = (ui: ReactNode) => {
	return render(ui, { wrapper: QCTestProvider })
}
