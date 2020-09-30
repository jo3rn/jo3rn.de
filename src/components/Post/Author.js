import React from "react";
import PropTypes from "prop-types";

import config from "../../../content/meta/config";
import avatar from "../../images/png/avatar.png";

import { DIMENS } from "../../constants";

const Author = props => {
  const { note } = props;

  return (
    <React.Fragment>
      <div className="author">
        <div className="avatar">
          <img
            src={config.gravatarImgMd5 == "" ? avatar : config.gravatarImgMd5}
            alt={config.siteTitle}
          />
        </div>
        <div className="note" dangerouslySetInnerHTML={{ __html: note }} />
      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .author {
          margin: ${DIMENS.space.l} 0;
          padding: ${DIMENS.space.l} 0;
          border-top: 1px solid var(--color-secondary);
          border-bottom: 1px solid var(--color-secondary);
        }
        .avatar {
          float: left;
          border-radius: 65% 75%;
          border: 1px solid var(--color-secondary);
          display: inline-block;
          height: 50px;
          margin: 5px 20px 0 0;
          overflow: hidden;
          width: 50px;
        }
        .avatar img {
          width: 100%;
        }
        .note {
          font-size: 0.9em;
          line-height: 1.6;
        }
        @from-width tablet {
          .author {
            display: flex;
          }
          .avatar {
            flex: 0 0 auto;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Author.propTypes = {
  note: PropTypes.string.isRequired,
};

export default Author;
