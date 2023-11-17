'use strict';

require('../config');

const { Article } = require('../config');

function createArticle(article) {
  let defaultArticle = {
    title: 'article de test',
    content: 'le contenu article test',
  };

  if (!article) {
    article = defaultArticle;
  }

  return Article.create(article);
}

module.exports = {createArticle};
