import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/from");
import { ThemeContext } from "../../layouts";

import { FaHome } from "react-icons/fa/";
import { FaEnvelope } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";
import { FaRegMoon } from "react-icons/fa/";

import Item from "./Item";
import Expand from "./Expand";

import { DIMENS } from "../../constants";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.itemList = React.createRef();

    const pages = props.pages.map(page => ({
      to: page.node.fields.slug,
      label: page.node.frontmatter.menuTitle
        ? page.node.frontmatter.menuTitle
        : page.node.frontmatter.title
    }));

    this.items = [
      { to: "/", label: "Service", icon: FaHome },
      { to: "/blog/", label: "Blog", icon: FaTag },
      //{ to: "/category/", label: "Themen", icon: FaTag }, //TODO: reference category page somewhere else
      ...pages,
      { to: "/contact/", label: "Kontakt", icon: FaEnvelope }
    ];

    this.renderedItems = []; // will contain references to rendered DOM elements of menu
  }

  state = {
    open: false,
    hiddenItems: []
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    fixed: PropTypes.bool.isRequired,
    screenWidth: PropTypes.number.isRequired,
    fontLoaded: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired,
    toggleTheme: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.renderedItems = this.getRenderedItems();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.path !== prevProps.path ||
      this.props.fixed !== prevProps.fixed ||
      this.props.screenWidth !== prevProps.screenWidth ||
      this.props.fontLoaded !== prevProps.fontLoaded
    ) {
      if (this.props.path !== prevProps.path) {
        this.closeMenu();
      }
      this.hideOverflowedMenuItems();
    }
  }

  getRenderedItems = () => {
    const itemList = this.itemList.current;
    return Array.from(itemList.children);
  };

  hideOverflowedMenuItems = () => {
    const PADDING_AND_SPACE_FOR_MORELINK = this.props.screenWidth >= 1024 ? 60 : 6;

    const itemsContainer = this.itemList.current;
    const maxWidth = itemsContainer.offsetWidth - PADDING_AND_SPACE_FOR_MORELINK;

    this.setState({ hiddenItems: [] }); // clears previous state

    const menu = this.renderedItems.reduce(
      (result, item) => {
        item.classList.add("item");
        item.classList.remove("hideItem");

        const currentCumulativeWidth = result.cumulativeWidth + item.offsetWidth;
        result.cumulativeWidth = currentCumulativeWidth;

        if (!item.classList.contains("more") && currentCumulativeWidth > maxWidth) {
          const link = item.querySelector("a");

          item.classList.add("hideItem");
          item.classList.remove("item");
          result.hiddenItems.push({
            to: link.getAttribute("data-slug"),
            label: link.text
          });
        }
        return result;
      },
      { visibleItems: [], cumulativeWidth: 0, hiddenItems: [] }
    );

    this.setState(prevState => ({ hiddenItems: menu.hiddenItems }));
  };

  toggleMenu = e => {
    e.preventDefault();

    if (this.props.screenWidth < 1024) {
      this.renderedItems.map(item => {
        const oldClass = this.state.open ? "showItem" : "hideItem";
        const newClass = this.state.open ? "hideItem" : "showItem";

        if (item.classList.contains(oldClass)) {
          item.classList.add(newClass);
          item.classList.remove(oldClass);
        }
      });
    }

    this.setState(prevState => ({ open: !prevState.open }));
  };

  closeMenu = e => {
    //e.preventDefault();

    if (this.state.open) {
      this.setState({ open: false });
      if (this.props.screenWidth < 1024) {
        this.renderedItems.map(item => {
          if (item.classList.contains("showItem")) {
            item.classList.add("hideItem");
            item.classList.remove("item");
          }
        });
      }
    }
  };

  render() {
    const { screenWidth } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {color => (
            <nav className={`menu ${open ? "open" : ""}`} rel="js-menu">
              <ul className="itemList" ref={this.itemList}>
                {this.items.map(item => (
                  <Item item={item} key={item.label} icon={item.icon} />
                ))}
              </ul>
              {this.state.hiddenItems.length > 0 && <Expand onClick={this.toggleMenu} />}
              {open && screenWidth >= 1024 && (
                <ul className="hiddenItemList">
                  {this.state.hiddenItems.map(item => (
                    <Item item={item} key={item.label} hiddenItem />
                  ))}
                </ul>
              )}
              <span className="toggleTheme" onClick={this.props.toggleTheme}>
                <FaRegMoon />
                {color === "light" ? "ON" : "OFF"}
              </span>
            </nav>
          )}
        </ThemeContext.Consumer>


        <style jsx>{`

          .fixed {
            z-index: 3;
          }
          
          .menu {
            align-items: center;
            background: var(--color-background);
            bottom: 0;
            display: flex;
            flex-grow: 1;
            left: 0;
            max-height: ${open ? "1000px" : "50px"};
            padding: 0 ${DIMENS.space.s};
            position: fixed;
            width: 100%;
            z-index: 1;
            transition: all ${DIMENS.time.s};
          }

          .itemList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            list-style: none;
            margin: 0;
            padding: 0; /* 0 ${DIMENS.space.s}; */
            position: relative;
            width: 100%;
          }

          @below desktop {
            .menu {
              &::after {
                position: absolute;
                content: "";
                left: ${DIMENS.space.m};
                right: ${DIMENS.space.m};
                top: 0;
                height: 1px;
                background: var(--color-background);
              }

              :global(.homepage):not(.fixed) & {
                bottom: -100px;
              }
            }
          }

          @from-width desktop {
            .menu {
              border-top: none;
              background: transparent;
              display: flex;
              position: relative;
              justify-content: flex-end;
              padding-left: 50px;
              transition: none;
            }

            .itemList {
              justify-content: flex-end;
              padding: 0;
            }

            .hiddenItemList {
              list-style: none;
              margin: 0;
              position: absolute;
              background: var(--color-background);
              border: 1px solid var(--color-primary);
              top: 48px;
              right: ${DIMENS.space.s};
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding: ${DIMENS.space.m};
              border-radius: ${DIMENS.space.xs};
              border-top-right-radius: 0;


              &:after {
                content: "";
                background: var(--color-background);
                z-index: 10;
                top: -10px;
                right: -1px;
                width: 44px;
                height: 10px;
                position: absolute;
                border-left: 1px solid var(--color-secondary);
                border-right: 1px solid var(--color-secondary);
              }

              :global(.homepage):not(.fixed) & {
                border: 1px solid transparent;
                background: color(white alpha(-10%));
                top: 50px;

                &:after {
                  top: -11px;
                  border-left: 1px solid transparent;
                  border-right: 1px solid transparent;
                  background: color(white alpha(-10%));
                }
              }

              :global(.fixed) & {
                top: 44px;
              }
            }
          }
          .toggleTheme {
            padding: ${DIMENS.space.s};
            color: var(--color-secondary_variant);
            cursor: pointer;
            white-space: nowrap;

            :hover {
              color: var(--color-primary_variant);
            }
          } 
        `}</style>
      </React.Fragment>
    );
  }
}

export default Menu;
