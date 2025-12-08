import { useState } from "react"
import { AlertBanner, CategoryPieChartDateForm } from "~/components"

function App() {
	const [showError, setShowError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>("")
	const handleFetchError = (err: string): void => {
		setErrorMessage(err ?? "Something went wrong.")
		setShowError(true)
	}
	const handleBannerClose = (): void => {
		setShowError(false)
	}
	return (
		<div
			className="w-screen h-screen max-h-screen bg-gray-100 px-4 pb-4 md:pb-8 md:px-8 flex flex-col items-center justify-center align-center font-sans font-arial font-helvetica overflow-scroll"
			data-testid="app-container"
		>
			{showError && (
				<AlertBanner
					title="Server Error"
					message={errorMessage}
					className="w-full sticky top-0 z-[1000]"
					onClose={handleBannerClose}
				/>
			)}
			<CategoryPieChartDateForm onFetchError={handleFetchError} />
		</div>
	)
}

export default App
