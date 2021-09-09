export function getStyle({ draggableStyle, isDragging }: any) {
	// Note(omer): If we put margin around card containers it results in snapping, to get around that we add spacing between list elements this way.
	const grid = 8;
	const result = {
		...draggableStyle,
		height: isDragging ? draggableStyle.height : draggableStyle.height - grid,
		left: isDragging ? draggableStyle.left : draggableStyle.left + grid,
		width: isDragging ? draggableStyle.width : `calc(${draggableStyle.width} - ${grid * 2}px)`,
		marginBottom: grid,
	};

	return result;
}
