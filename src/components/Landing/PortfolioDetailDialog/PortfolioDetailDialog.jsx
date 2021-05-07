import React from "react";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";
import Image from "../../Image";
import Icon from "../../Icon";

const PortfolioDetailDialog = ({
  onHide,
  imageFileName,
  imageAlt,
  header,
  subheader,
  content,
  link,
  linkTitle,
  ...restProps
}) => {
  return (
    <Modal
      {...restProps}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="portfolio-modal-header">
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-auto portfolio-modal-body">
        <Image
          className="img-fluid d-block"
          fileName={imageFileName}
          alt={imageAlt || header || subheader}
        />
        <p className="item-intro text-muted">{subheader}</p>
        <p>{content}</p>
        {link == "" ? "" : <a href={link}>{"->"} {linkTitle}</a>}
      </Modal.Body>
      <Modal.Footer className="portfolio-modal-footer">
        <div className="mx-auto">
          <Button variant="primary" onClick={onHide}>
            <Icon iconName="CloseIcon" />
            &nbsp; Schließen
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

PortfolioDetailDialog.propTypes = {
  onHide: PropTypes.func,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  linkTitle: PropTypes.string,
};

PortfolioDetailDialog.defaultProps = {
  onHide: null,
  imageFileName: "",
  imageAlt: null,
  header: "",
  subheader: "",
  content: "",
  link: "",
  linkTitle: "",
};

export default PortfolioDetailDialog;
