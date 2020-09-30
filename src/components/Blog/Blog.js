import PropTypes from "prop-types";
import React from "react";

import Item from "./Item";

import { DIMENS } from "../../constants";

const Blog = props => {
  const { posts } = props;

  return (
    <React.Fragment>
      <main className="main">
        <ul>
          {posts.map(post => {
            const {
              node,
              node: {
                fields: { slug }
              }
            } = post;
            return <Item key={slug} post={node} />;
          })}
        </ul>
      </main>

      {/* --- STYLES --- */}
      <style jsx>{`
        .main {
          padding: 0 ${DIMENS.space.m};
        }

        ul {
          list-style: none;
          margin: 0 auto;
          padding: ${`calc(${DIMENS.space.m} * 1.5) 0 calc(${DIMENS.space.m} * 0.5)`};
        }

        @above tablet {
          .main {
            padding: 0 ${`0 calc(${DIMENS.space.m} * 1.5)`};
          }
          ul {
            max-width: ${DIMENS.tablet.maxWidth};
          }
        }
        @above desktop {
          ul {
            max-width: ${DIMENS.desktop.maxWidth};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Blog;
