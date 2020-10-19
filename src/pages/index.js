import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import fileNameToSectionName from "../utils/fileNameToSectionName";
import * as Sections from "../views/Sections";

class IndexPage extends React.Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        sections: { nodes: sections = [] },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} />
          )}
        </ThemeContext.Consumer>

        <hr ref={this.separator} />

        {// dynamically import sections
        sections.map(({ frontmatter, fields: { fileName } }, ind) => {
          const sectionComponentName = fileNameToSectionName(fileName);
          const SectionComponent = Sections[sectionComponentName];

          return SectionComponent ? (
            <SectionComponent
              key={sectionComponentName}
              className={ind % 2 === 1 ? "bg-alternating" : null}
              frontmatter={frontmatter}
            />
          ) : null;
        })}

        <Seo />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    sections: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//(parts)/" }, frontmatter: { anchor: { ne: null } } }
      sort: { order: ASC, fields: fields___fileName }
    ) {
      nodes {
        frontmatter {
          menuTitle
          header
          anchor
          subheader
          clients {
            href
            imageFileName
          }
          portfolios {
            content
            header
            imageFileName
            imageFileNameDetail
            subheader
          }
          services {
            content
            header
            iconName
          }
        }
        fields {
          fileName
        }
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;
