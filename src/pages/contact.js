import PropTypes from "prop-types";
import React from "react";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Contact from "../components/Contact";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const ContactPage = props => {
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article>
            <header>
              <Headline title="Kontakt" />
            </header>
            <Contact />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo />
    </React.Fragment>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ContactPage;
