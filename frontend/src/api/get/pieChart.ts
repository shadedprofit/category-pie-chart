import { BASE_API_URL } from "~/constants"
import type { PieChartAPIResponse } from "~/interfaces"

export const getPieChart = async (
	start: string = "",
	end: string = ""
): Promise<PieChartAPIResponse> => {
	const apiUrl = `${BASE_API_URL}/pie-chart?start_date=${start}&end_date=${end}`
	const response = await fetch(apiUrl)

	if (!response.ok) {
		throw new Error("Something went wrong.")
	}

	return response?.json() as unknown as PieChartAPIResponse
}
