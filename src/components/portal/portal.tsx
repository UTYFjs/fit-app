import { ReactNode } from 'react';

import { createPortal } from 'react-dom';
type PortalProps = {
    children: ReactNode;
    parent: Element;
};
export const Portal = ({ children, parent }: PortalProps) => createPortal(children, parent);
