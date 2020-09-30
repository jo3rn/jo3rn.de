import React from "react";
import PropTypes from "prop-types";

import { DIMENS } from "../../constants";

const Article = props => {
  const { children } = props;

  return (
    <React.Fragment>
      <article className="article">{children}</article>

      {/* --- STYLES --- */}
      <style jsx>{`
        .article {
          color: var(--color-text);
          padding: ${DIMENS.space.m};
          margin: 0 auto;
        }
        @from-width tablet {
          .article {
            padding: ${`calc(${DIMENS.space.m}) calc(${DIMENS.space.m} * 2)`};
            max-width: ${DIMENS.tablet.maxWidth};
          }
        }
        @from-width desktop {
          .article {
            padding: ${`calc(${DIMENS.space.m} * 2 + 90px) 0 calc(${DIMENS.space.m} * 2)`};
            max-width: ${DIMENS.desktop.maxWidth};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Article.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Article;
