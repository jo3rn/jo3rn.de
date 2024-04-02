const nextTranslate = require('next-translate-plugin')

module.exports = {
    // get i18n config from i18n.json
    ...nextTranslate(),
  }