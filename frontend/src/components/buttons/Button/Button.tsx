import React from "react"
import clsx from "clsx"

export const Button: React.FC<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ disabled = false, className, ...props }): React.ReactElement => {
	return (
		<button
			className={clsx([
				"bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-blue-500 rounded",
				{ "opacity-50 cursor-not-allowed": disabled },
				className
			])}
			data-testid="button"
			{...props}
		>
			{props.children}
		</button>
	)
}
