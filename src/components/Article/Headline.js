import React from "react";
import PropTypes from "prop-types";

import { DIMENS } from "../../constants";

const Headline = props => {
  const { title, children } = props;

  return (
    <React.Fragment>
      {title ? <h1>{title}</h1> : <h1>{children}</h1>}

      {/* --- STYLES --- */}
      <style jsx>{`
        h1 {
          color: var(--color-text);
          font-size: ${DIMENS.font.size.xxl};
          margin-bottom: ${DIMENS.space.l};
          animation-name: headlineEntry;
          animation-duration: ${DIMENS.time.m};

          :global(span) {
            font-weight: ${DIMENS.font.weight.standard};
            display: block;
            font-size: 0.5em;
            letter-spacing: 0;
            margin-bottom: ${DIMENS.space.xs};
          }

          :global(svg) {
            height: 0.75em;
            fill: var(--color-primary);
          }
        }

        @keyframes headlineEntry {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }

        @from-width tablet {
          h1 {
            font-size: ${`calc(${DIMENS.font.size.xl} * 1.2)`};
          }
        }

        @from-width desktop {
          h1 {
            font-size: ${`calc(${DIMENS.font.size.xl} * 1.4)`};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Headline.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Headline;
