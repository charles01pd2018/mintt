import type { MouseEvent, TouchEvent } from 'react';

// Tap Event for inline event handlers - covers built in PointerEvent from react
type ReactTapEvent = MouseEvent | TouchEvent;

export default ReactTapEvent;