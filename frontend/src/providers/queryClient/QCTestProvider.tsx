import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const QCTestProvider = ({ children }: { children: React.ReactNode }) => {
	// Create a new QueryClient for each test to ensure isolation
	const createTestQueryClient = () =>
		new QueryClient({
			defaultOptions: {
				queries: {
					retry: false // Disable retries in tests for faster execution
				}
			}
		})
	const queryClient = createTestQueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
