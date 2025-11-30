import type { PieChartAPIResponse } from "@/interfaces";

export const getPieChart = async (
    start: string = "",
    end: string = ""
): Promise<PieChartAPIResponse | null> => {
    const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/pie-chart?start_date=${start}&end_date=${end}`
    const response = await fetch(apiUrl)
    return response?.json() as unknown as PieChartAPIResponse
}