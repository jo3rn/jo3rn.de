import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { DIMENS } from "../../constants";

const List = props => {
  const { edges } = props;

  return (
    <React.Fragment>
      <ul>
        {edges.map(edge => {
          const {
            node: {
              frontmatter: { title },
              fields: { slug }
            }
          } = edge;

          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>

      {/* --- STYLES --- */}
      <style jsx>{`
        ul {
          margin-bottom: ${DIMENS.space.s};
          padding: ${DIMENS.space.m};
          list-style: circle;
        }
        li {
          padding: ${DIMENS.space.xs} 0;
          font-size: ${DIMENS.font.size.s};
          line-height: ${DIMENS.font.lineHeight.l};
        }
      `}</style>
    </React.Fragment>
  );
};

List.propTypes = {
  edges: PropTypes.array.isRequired,
};

export default List;
