import React from "react"
import clsx from "clsx"

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}): React.ReactElement => {
	return (
		<div
			className={clsx([
				"max-w-sm w-full md:max-w-[50%] h-full md:flex flex-col p-4 bg-white rounded overflow-scroll shadow-lg",
				className
			])}
			data-testid="card"
			{...props}
		>
			{props.children}
		</div>
	)
}
