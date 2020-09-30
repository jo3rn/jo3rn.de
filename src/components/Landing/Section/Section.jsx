import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Container } from "react-bootstrap";

import "./Section.scss";

const Section = ({ children, className, ...restProps }) => {
  return (
    <section className={clsx("page-section", className)} {...restProps}>
      <Container>{children}</Container>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

Section.defaultProps = {
  children: null,
  className: null,
};

export default Section;
