import { FaAngleDown } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";

import { DIMENS } from "../../constants";

const Expand = props => {
  const { onClick } = props;

  return (
    <React.Fragment>
      <button className="more" to="#" onClick={onClick} aria-label="expand">
        <FaAngleDown size={30} />
      </button>

      {/* --- STYLES --- */}
      <style jsx>{`
        .more {
          cursor: pointer;
        }

        @below desktop {
          .more {
            background: var(--color-background);
            border: 1px solid var(--color-text);
            border-radius: ${DIMENS.space.xs} ${DIMENS.space.xs} 0 0;
            border-bottom: none;
            position: absolute;
            left: 50%;
            top: -35px;
            width: 60px;
            height: 36px;
            overflow: hidden;
            z-index: 1;
            transform: translateX(-50%);

            &:focus {
              outline: none;

              :global(svg) {
                fill: var(--color-primary);
              }
            }

            :global(svg) {
              transition: all 0.5s;
              transform: rotateZ(180deg);
              fill: var(--color-attention);
            }

            :global(.open) & :global(svg) {
              transform: rotateZ(0deg);
            }
          }
        }

        @from-width desktop {
          .more {
            flex-shrink: 0;
            flex-grow: 0;
            width: 44px;
            height: 38px;
            background: transparent;
            margin-left: 10px;
            border-radius: ${DIMENS.space.xs};
            border: 1px solid var(--color-secondary);
            display: flex;
            transition: background-color ${DIMENS.time.s};
            justify-content: center;
            align-items: center;
            padding: 0;
            z-index: 1;

            &:focus,
            &:hover {
              outline: none;
            }

            :global(svg) {
              transition: all ${DIMENS.time.s};
            }

            :global(.homepage) & {
              border: 1px solid transparent;
              background-color: color(white alpha(-90%));

              &:hover {
                background-color: color(white alpha(-60%));
              }
            }

            :global(.open) & {
              background-color: color(white alpha(-10%));
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              &:hover {
                background-color: color(white alpha(-10%));
              }

              :global(svg) {
                transform: rotate(180deg);
              }
            }

            :global(.fixed) & {
              border: 1px solid var(--color-secondary);
              height: 30px;
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Expand.propTypes = {
  onClick: PropTypes.func,
};

export default Expand;
