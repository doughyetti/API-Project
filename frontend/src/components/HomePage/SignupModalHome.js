import React from "react";
import { useModal } from "../../context/Modal";

function SignupModalHome({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <button className="signup-button" onClick={onClick}>{buttonText}</button>;
};

export default SignupModalHome;
