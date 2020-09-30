import PropTypes from "prop-types";
import React from "react";
import Blog from "../components/Blog";
import { ThemeContext } from "../layouts";
import Seo from "../components/Seo";

import { graphql } from "gatsby";

const BlogPage = props => {
  const {
    data: {
      posts: { edges: posts = [] }
    }
  } = props;
  return (
    <React.Fragment>
      <ThemeContext.Consumer>{theme => <Blog posts={posts} />}</ThemeContext.Consumer>

      <Seo />
    </React.Fragment>
  );
};

BlogPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default BlogPage;

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
