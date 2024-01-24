import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Caisse_accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        marginBottom: "10px",
        backgroundColor: "rgba(0, 126, 127, 0.75)",
        borderRadius: "5px",        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          cursor: "pointer",
          borderBottom: "1px solid #ccc",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          color: "#FFF7D6",
          transition: "background-color 0.3s",
        }}
        onClick={toggleAccordion}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {title}
        </div>
        <div>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </div>
      <div
        style={{
          padding: "10px",
          color: "#FFF7D6",
          maxHeight: isOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default Caisse_accordion;
