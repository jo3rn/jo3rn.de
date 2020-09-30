import React from "react";
import PropTypes from "prop-types";

import { DIMENS } from "../../constants";

const Bodytext = props => {
  const { html } = props;

  return (
    <React.Fragment>
      <div className="bodytext" dangerouslySetInnerHTML={{ __html: html }} />

      <style jsx>{`
        .bodytext {
          animation-name: bodytextEntry;
          animation-duration: ${DIMENS.time.m};
          /*color: var(--color-text);*/

          :global(h2),
          :global(h3) {
            margin: 1.5em 0 1em;
          }

          :global(h2) {
            line-height: ${DIMENS.font.lineHeight.s};
            font-size: ${DIMENS.font.size.l};
          }

          :global(h3) {
            font-size: ${DIMENS.font.size.m};
            line-height: ${DIMENS.font.lineHeight.m};
          }

          :global(p) {
            font-size: ${DIMENS.font.size.s};
            line-height: ${DIMENS.font.lineHeight.xxl};
            margin: 0 0 1.5em;
          }
          :global(ul) {
            list-style: circle;
            margin: 0 0 1.5em;
            padding: 0 0 0 1.5em;
          }
          :global(li) {
            margin: 0.7em 0;
            line-height: 1.5;
          }
          :global(a) {
            font-weight: ${DIMENS.font.weight.bold};
            color: var(--color-secondary_variant);
            text-decoration: underline;
          }
          :global(a.gatsby-resp-image-link) {
            border: 0;
            display: block;
            margin: 2.5em 0;
            border-radius: ${DIMENS.space.s};
            overflow: hidden;
            border: 1px solid var(--color-secondary);
          }
          :global(code.language-text) {
            background: var(--color-background);
            text-shadow: none;
            color: inherit;
            padding: 0.1em 0.3em 0.2em;
            border-radius: 0.1em;
          }
        }

        @keyframes bodytextEntry {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Bodytext.propTypes = {
  html: PropTypes.string.isRequired,
};

export default Bodytext;
