import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const ModalOverlay = props => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={
                props.onSubmit ? props.onSubmit : event => event.preventDefault()
            }
            >
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

//This component setup is a bit complicated but it basically works as follows. The 'ModalOverlay' above allows for me to 
//  pass the information coming into the modal i.e. the {...props} and pass them to the 'ModalOverlay above which is an
//  internal component that allows for a footer, a form, etc. So it simply takes all of the properties and 'spreads' them into
//  an internal component for extra functionality.
const Modal = props => {
    return (
    <React.Fragment>
        {props.show && <Backdrop onClick={props.onCancel} />}
        <CSSTransition 
        in={props.show} 
        mountOnEnter 
        unmountOnExit 
        timeout={200} 
        classNames="modal"
        >
            <ModalOverlay {...props} />
        </CSSTransition>
    </React.Fragment>
    );
};

export default Modal;