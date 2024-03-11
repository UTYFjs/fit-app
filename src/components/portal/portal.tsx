import { ReactNode } from 'react';
import './portal.css';
import { createPortal } from 'react-dom';



type PortalProps = {
  children: ReactNode;
  parent: Element;
};


const Portal = ({ children, parent }: PortalProps) => createPortal(children, parent)

export default Portal;
