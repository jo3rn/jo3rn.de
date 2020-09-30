import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { FaCalendar } from "react-icons/fa/";
import { FaUser } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";

import { DIMENS } from "../../constants";

const Meta = props => {
  const { prefix, author: authorName, category } = props;

  return (
    <p className="meta">
      <span>
        <FaCalendar size={18} /> {prefix}
      </span>
      <span>
        <FaUser size={18} /> {authorName}
      </span>
      {category && (
        <span>
          <FaTag size={18} />
          <Link to={`/category/${category.split(" ").join("-")}`}>{category}</Link>
        </span>
      )}

      {/* --- STYLES --- */}
      <style jsx>{`
        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          margin: ${DIMENS.space.m} 0;
          background: transparent;

          :global(svg) {
            fill: var(--color-secondary);
            margin-right: ${DIMENS.space.xs};
          }
          span {
            align-items: center;
            display: flex;
            text-transform: uppercase;
            margin: ${DIMENS.space.xs} ${DIMENS.space.s} ${DIMENS.space.xs} 0;
          }
        }
        @from-width tablet {
          .meta {
            margin: ${`calc(${DIMENS.space.m} * 1.5) 0 ${DIMENS.space.m}`};
          }
        }
      `}</style>
    </p>
  );
};

Meta.propTypes = {
  prefix: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
};

export default Meta;
