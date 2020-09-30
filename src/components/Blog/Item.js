import { FaArrowRight } from "react-icons/fa/";
import { FaCalendar } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";
import { FaUser } from "react-icons/fa/";
import Img from "gatsby-image";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { DIMENS } from "../../constants";

const Item = props => {
  const {
    post: {
      excerpt,
      fields: { slug, prefix },
      frontmatter: {
        title,
        category,
        author,
        cover: {
          children: [{ fluid }]
        }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <li>
        <Link to={slug} key={slug} className="link">
          <div className="gatsby-image-outer-wrapper">
            <Img fluid={fluid} />
          </div>
          <h1>
            {title} <FaArrowRight className="arrow" />
          </h1>
          <p className="meta">
            <span>
              <FaCalendar size={18} /> {prefix}
            </span>
            <span>
              <FaUser size={18} /> {author}
            </span>
            {category && (
              <span>
                <FaTag size={18} /> {category}
              </span>
            )}
          </p>
          <p>{excerpt}</p>
        </Link>
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        :global(.link) {
          width: 100%;
          color: var(--color-primary);
        }

        li {
          border: 1px solid transparent;
          border-radius: ${DIMENS.space.s};
          margin: ${`calc(${DIMENS.space.m} * 2) 0 calc(${DIMENS.space.m} * 3)`};
          padding: ${DIMENS.space.s};
          position: relative;
          transition: all ${DIMENS.time.s};
          background: transparent;

          :global(.gatsby-image-outer-wrapper) {
            border-radius: ${DIMENS.space.s};
            border: 1px solid var(--color-secondary);
            overflow: hidden;
          }
          :global(.gatsby-image-outer-wrapper img) {
            z-index: -1;
          }

          &::after {
            border-top: 1px solid var(--color-secondary);
            content: "";
            height: 0;
            position: absolute;
            bottom: ${`calc(${DIMENS.space.m} * -1.5)`};
            left: 50%;
            transform: translateX(-50%);
            transition: all ${DIMENS.time.s};
            width: 50%;
          }

          &:first-child {
            &::before {
              border-top: 1px solid var(--color-secondary);
              content: "";
              height: 0;
              position: absolute;
              top: ${`calc(${DIMENS.space.m} * -1.5)`};
              left: 50%;
              transform: translateX(-50%);
              transition: all ${DIMENS.time.s};
              width: 50%;
            }
          }
        }

        h1 {
          padding: ${DIMENS.space.m} ${DIMENS.space.s} 0;
          line-height: ${DIMENS.font.lineHeight.xs};
          font-size: ${DIMENS.font.size.l};
          text-remove-gap: both;

          :global(.arrow) {
            display: none;
            position: relative;
            top: 7px;
          }
        }

        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          padding: ${DIMENS.space.m} ${DIMENS.space.s};
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

        p {
          line-height: 1.5;
          padding: 0 ${DIMENS.space.s};
          text-remove-gap: both;
        }

        @from-width tablet {
          li {
            margin: ${`calc(${DIMENS.space.m} * 3) 0 calc(${DIMENS.space.m} * 4)`};
            padding: ${DIMENS.space.m};

            &::after {
              bottom: ${`calc(${DIMENS.space.m} * -2)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${DIMENS.space.m} * -1.75)`};
              }
            }
          }

          h1 {
            font-size: ${`calc(${DIMENS.font.size.l} * 1.2)`};
            padding: ${`calc(${DIMENS.space.m} * 1.5) ${DIMENS.space.m} 0`};
            transition: all 0.5s;
          }
          .meta {
            padding: ${`calc(${DIMENS.space.m} * 1.5) ${DIMENS.space.m}`};
          }
          p {
            padding: 0 ${DIMENS.space.m};
          }
        }
        @from-width desktop {
          li {
            margin: ${`calc(${DIMENS.space.m} * 4) 0 calc(${DIMENS.space.m} * 5)`};
            padding: 0 0 ${`calc(${DIMENS.space.m} * 2)`};

            &::after {
              bottom: ${`calc(${DIMENS.space.m} * -1.5)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${DIMENS.space.m} * -2.75)`};
              }
            }
          }

          :global(.blogItemLink:first-child) > li::before {
            top: ${`calc(${DIMENS.space.m} * -2.75)`};
          }
          h1 {
            font-size: 2.5em;
            padding: ${`calc(${DIMENS.space.m} * 1.2) calc(${DIMENS.space.m} * 2) 0`};
          }
          .meta {
            padding: ${`calc(${DIMENS.space.m} * 1.5) calc(${DIMENS.space.m} * 2)
              calc(${DIMENS.space.m} * 0.5)`};
          }
          p {
            padding: ${`0 calc(${DIMENS.space.m} * 2)`};
          }
          li {
            &:hover {
              border: 1px solid var(--color-secondary);
              box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);

              &:after {
                bottom: ${`calc(${DIMENS.space.m} * -2.5)`};
              }
              :global(.gatsby-image-wrapper) {
                transform: scale(1.1);
              }
              h1 {
                color: var(--color-secondary_variant);
              }
              :global(.arrow) {
                opacity: 1;
                stroke: var(--color-attention);
                transform: translateX(0);
              }
            }
            :global(.gatsby-image-wrapper) {
              transition: all ${DIMENS.time.s};
            }
            :global(.arrow) {
              display: inline-block;
              fill: var(--color-attention);
              stroke: var(--color-attention);
              stroke-width: 40;
              stroke-linecap: round;
              opacity: 0;
              transition: all 0.5s;
              transform: translateX(-50%);
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Item;
