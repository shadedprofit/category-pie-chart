export interface ErrorResponse {
    error?: string
}

export interface CategoryCount {
    category: string
    count: number
}

export interface PieChartAPIResponse extends ErrorResponse {
    data?: CategoryCount[]
}