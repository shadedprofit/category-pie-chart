import type { CardProps } from "~/interfaces"

export const Card: React.FC<CardProps> = (props): React.ReactElement => {
    return (
        <div {...props}>
            {props.children}
        </div>
    )
}