import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row, Col } from "react-bootstrap";
import Section from "../../../components/Landing/Section";
import Client from "../../../components/Landing/Client";

const Clients = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header, clients } = frontmatter;

  return (
    <Section className={clsx("py-5", className)} id={anchor}>
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h2 className="mt-0">{header}</h2>
        </Col>
      </Row>
      <Row className="d-flex flex-wrap align-items-center justify-content-center">
        {clients.map(({ href, imageFileName }) => (
          <Col md={3} sm={6} className="my-3" key={imageFileName}>
            <Client href={href} imageFileName={imageFileName} />
          </Col>
        ))}
      </Row>
    </Section>
  );
};

Clients.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Clients.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Clients;
