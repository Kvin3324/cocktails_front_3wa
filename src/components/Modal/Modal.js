import React from "react";
import ModalStyled from "../../style/ModalStyled.style";

function Modal(props) {
  return (
    <React.Fragment>
      <ModalStyled as="section">
        <div id="myModal">
          <div className="modal-content">
            <div className="modal-content__title">
              <h2>{props.modal.title}</h2>
              <span className="close" onClick={() => props.cancelAction()}>
                &times;
              </span>
            </div>
            <p>{props.modal.content}</p>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => props.cancelAction()}
              >
                {props.modal.btnCancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.confirmAction()}
              >
                {props.modal.btnConfirm}
              </button>
            </div>
          </div>
        </div>
      </ModalStyled>
    </React.Fragment>
  );
}

export default Modal;
