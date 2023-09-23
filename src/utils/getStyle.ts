import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

type Props = {
    draggableStyle?: DraggingStyle | NotDraggingStyle;
    isDragging: boolean;
};

// Type Guard
function isDraggingStyle(obj: any): obj is DraggingStyle {
    return obj && obj.position === true;
}

export function getStyle({ draggableStyle, isDragging }: Props) {
    // NOTE(omer): If we put margin around card containers it results in snapping, to get around that we add spacing between list elements
    const grid = 8;

    if (isDraggingStyle(draggableStyle)) {
        const height = isDragging ? draggableStyle.height : draggableStyle.height - grid;
        const left = isDragging ? draggableStyle.left : draggableStyle.left + grid;
        const width = isDragging ? draggableStyle.width : `calc(${draggableStyle.width} - ${grid * 2}px)`;

        const result = {
            ...draggableStyle,
            height: height,
            left: left,
            width: width,
            marginBottom: grid,
        };

        return result;
    }

    return { ...draggableStyle, marginBottom: grid };
}
