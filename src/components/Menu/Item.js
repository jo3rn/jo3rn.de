import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { DIMENS } from "../../constants";

const Item = props => {
  const { item: { label, to, icon: Icon } = {}, onClick } = props;

  return (
    <React.Fragment>
      <li className={"hiddenItem" in props ? "hiddenItem" : "item"} key={label}>
        <Link
          to={to}
          className={"hiddenItem" in props ? "inHiddenItem" : ""}
          onClick={onClick}
          data-slug={to}
        >
          {Icon && <Icon />} {label}
        </Link>
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        .item,
        .showItem {
          background: transparent;
          transition: all ${DIMENS.time.s};
          display: flex;
          align-items: center;

          :global(a) {
            padding: ${DIMENS.space.s};
            display: flex;
            align-items: center;
          }

          :global(svg) {
            margin: 0 ${DIMENS.space.xs} 0 0;
            opacity: 0.3;
          }
        }

        :global(.itemList .hideItem) {
          display: none;
        }

        @from-width desktop {
          .item {
            :global(a) {
              color: var(--color-text);
              padding: ${DIMENS.space.s};
              transition: all ${DIMENS.time.s};
              border-radius: ${DIMENS.space.xs};
            }

            :global(.homepage):not(.fixed) & :global(a) {
              color: var(--color-text_menu_landing);
            }

            :global(a:hover) {
              color: var(--color-primary_variant);
              background: color(white alpha(-60%));
            }

            :global(svg) {
              transition: all ${DIMENS.time.s};
            }

            &:hover :global(svg) {
              fill: var(--color-primary_variant);
              opacity: 1;

              :global(.hero) & :global(svg) {
                fill: green;
              }
            }
          }

          .showItem {
            display: none;
          }

          .hiddenItem {
            text-align: left;
            padding: ${DIMENS.space.xs};

            & :global(a.inHiddenItem) {
              color: var(--color-text);
              &:hover {
                color: var(--color-primary);
              }
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.func,
};

export default Item;
