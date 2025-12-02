import type { ButtonProps } from "~/interfaces"

export const Button: React.FC<ButtonProps> = (props): React.ReactElement => {
    return (
        <button {...props}>
            {props.children}
        </button>)
}