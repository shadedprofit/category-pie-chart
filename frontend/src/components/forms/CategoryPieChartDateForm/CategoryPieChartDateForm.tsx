import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import DatePicker from "react-datepicker"
// The line below would be `import { CategoryPieChart } from "category-pie-chart"`
// if published to npm.
import { CategoryPieChart } from "lib/index"
import { Button, Card, LoadingSpinner, ExclamationCircle } from "~/components"
import { GET_PIE_CHART } from "~/constants"
import type { CategoryPieChartDateFormProps } from "~/interfaces"
import { getPieChart } from "~/api"
import { formatDateToYYYYMMDD } from "~/utils"

export const CategoryPieChartDateForm: React.FC<
	CategoryPieChartDateFormProps
> = ({ onClose, onFetchError }): React.ReactElement => {
	const today = new Date()
	const oneYearAgo = new Date(today)
	oneYearAgo.setFullYear(today.getFullYear() - 1)
	const [startDateString, setStartDateString] = useState<string>(
		formatDateToYYYYMMDD(oneYearAgo)
	)
	const [endDateString, setEndDateString] = useState<string>(
		formatDateToYYYYMMDD(today)
	)
	const [formStartDate, setFormStartDate] = useState<Date>(oneYearAgo)
	const [formEndDate, setFormEndDate] = useState<Date>(today)
	const {
		data: res,
		isLoading,
		isError: isFetchError
	} = useQuery({
		queryKey: [GET_PIE_CHART, startDateString, endDateString],
		queryFn: async () => await getPieChart(startDateString, endDateString),
		gcTime: 5 * 60 * 1000,
		staleTime: 5 * 60 * 1000
	})
	const isError = isFetchError || Boolean(res?.error)
	const data = res?.data

	useEffect(() => {
		return () => {
			// Call onClose when Component unmounts
			if (onClose) {
				onClose()
			}
		}
	}, [])

	useEffect(() => {
		if (isError && onFetchError) {
			onFetchError(res?.error ?? "Something went wrong.")
		}
	}, [isError])

	const handleStartChange = (date: Date | null): void => {
		if (date) {
			setFormStartDate(date)
		}
	}
	const handleEndChange = (date: Date | null): void => {
		if (date) {
			setFormEndDate(date)
		}
	}
	const handleSubmit: React.MouseEventHandler = (): void => {
		setStartDateString(formatDateToYYYYMMDD(formStartDate))
		setEndDateString(formatDateToYYYYMMDD(formEndDate))
	}
	const handleSubmitKeydown: React.KeyboardEventHandler = (
		evt: React.KeyboardEvent
	): void => {
		if (evt.key === "Enter") {
			handleSubmit({} as React.MouseEvent)
		}
	}
	return (
		<Card data-testid="category-pie-chart-date-form">
			<div className="mt-4 text-center align-middle">
				<h1 className="text-lg font-semibold">
					Category Count by Date
				</h1>
			</div>
			<div className="flex justify-center items-center align-center w-full">
				{isLoading && <LoadingSpinner className="my-12" />}
				{isError && (
					<ExclamationCircle className="text-red-500 h-12 w-12 my-8" />
				)}
				{Boolean(data) && !isLoading && (
					<div className="w-[70%]">
						<CategoryPieChart
							data={data ?? []}
							legendHeight={136}
						/>
					</div>
				)}
			</div>
			<div className="my-4 px-0 flex flex-col gap-4">
				<div className="flex flex-row gap-2 items-center justify-center">
					<h3 className="w-[85px]">Start Date</h3>
					<DatePicker
						className="border border-gray-300 rounded pl-2 py-1"
						selected={formStartDate}
						onChange={handleStartChange}
					/>
				</div>
				<div className="flex flex-row gap-2 items-center justify-center">
					<h3 className="w-[85px]">End Date</h3>
					<DatePicker
						className="border border-gray-300 rounded pl-2 py-1"
						selected={formEndDate}
						onChange={handleEndChange}
					/>
				</div>
			</div>
			<div className="w-full my-4 flex justify-center items-center align-center">
				<Button
					disabled={isLoading}
					onClick={handleSubmit}
					onKeyDown={handleSubmitKeydown}
				>
					Submit
				</Button>
			</div>
		</Card>
	)
}
