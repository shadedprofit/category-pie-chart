import React from "react"
import clsx from "clsx"

export const LoadingSpinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}): React.ReactElement => {
	return (
		<div
			className={clsx([
				"w-14 h-14 rounded-full border-4 border-blue-800 border-t-transparent animate-spin",
				className
			])}
			data-testid="loading-spinner"
			{...props}
		/>
	)
}
