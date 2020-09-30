import React from "react";
import PropTypes from "prop-types";

import { DIMENS } from "../../constants";

const Footer = props => {
  const { html } = props;

  return (
    <React.Fragment>
      <footer className="footer" dangerouslySetInnerHTML={{ __html: html }} />

      {/* --- STYLES --- */}
      <style jsx>{`
        .footer {
          background: var(--color-background);
          padding: ${DIMENS.space.m};
          padding-top: 0;
          padding-bottom: 120px;

          :global(ul) {
            list-style: none;
            text-align: center;
            padding: 0;

            :global(li) {
              color: var(--color-text);
              font-size: ${DIMENS.font.size.xxs};
              padding: ${DIMENS.space.xxs} ${DIMENS.space.s};
              position: relative;
              display: inline-block;

              &::after {
                content: "•";
                position: absolute;
                right: ${`calc(${DIMENS.space.xs} * -1)`};
              }
              &:last-child::after {
                content: "";
              }
            }

            :global(a) {
              font-weight: ${DIMENS.font.weight.bold};
              color: var(--color-secondary_variant);
            }
          }
        }

        @from-width desktop {
          .footer {
            padding: 0 1em 1.5em;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Footer.propTypes = {
  html: PropTypes.string,
};

export default Footer;
