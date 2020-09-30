import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import { FaArrowDown } from "react-icons/fa/";
import { DIMENS } from "../../constants";

const Hero = props => {
  const { scrollToContent, backgrounds } = props;

  return (
    <React.Fragment>
      <section className="hero">
        <Button size="xl" variant="primary" className="text-uppercase" onClick={scrollToContent} aria-label="scroll">
          was ich biete
          <br/>
          <FaArrowDown/>
        </Button>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .hero {
          align-items: center;
          background-image: url(${backgrounds.mobile});
          background-size: cover;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 100vh;
          height: 100px;
          padding: ${DIMENS.space.l};

        }

        @keyframes buttonIconMove {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @from-width tablet {
          .hero {
            background-image: url(${backgrounds.tablet});
          }

          h1 {
            max-width: 90%;
            font-size: ${`calc(${DIMENS.font.size.xxxl} * 1.3)`};
          }

          button {
            font-size: ${DIMENS.font.size.l};
          }
        }

        @from-width desktop {
          .hero {
            background-image: url(${backgrounds.desktop});
          }

          h1 {
            max-width: 80%;
            font-size: ${`calc(${DIMENS.font.size.xxxl} * 1.5)`};
          }

          button {
            font-size: ${DIMENS.font.size.xxl};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  scrollToContent: PropTypes.func.isRequired,
  backgrounds: PropTypes.object.isRequired,
};

export default Hero;
