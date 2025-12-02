import { BASE_API_URL } from "~/constants"
import type { PieChartAPIResponse } from "~/interfaces"

export const getPieChart = async (
    start: string = "",
    end: string = ""
): Promise<PieChartAPIResponse | null> => {
    const apiUrl = `${BASE_API_URL}/pie-chart?start_date=${start}&end_date=${end}`
    let response = null
    try {
        response = await fetch(apiUrl)
    } catch (e) {
        console.error(e)
    }
    
    return response?.json() as unknown as PieChartAPIResponse | null
}