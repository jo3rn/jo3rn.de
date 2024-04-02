import { getSortedPostsData } from "./posts";

function createSlug(phrase) {
  return phrase.replace(" ", "-");
}

export function getCategoriesWithPosts(locale) {
  const allPostsData = getSortedPostsData(locale);
  const categoriesWithPosts = {};
  allPostsData.map(({ category, id, title }) => {
    const categorySlug = createSlug(category);
    categoriesWithPosts[categorySlug] = categoriesWithPosts[categorySlug] || [];
    categoriesWithPosts[categorySlug].push({
      id: id,
      title: title,
      category: category,
    });
  });

  return categoriesWithPosts;
}

export function getAllCategoryIds(locales) {
  const paths = [];

  for (let locale of locales) {
    const allPostsData = getSortedPostsData(locale);
    const categories = new Set();

    allPostsData.map(({ category }) => {
      const categorySlug = createSlug(category);
      categories.add(categorySlug);
    });

    [...categories].map((category) => {
      paths.push({
        params: {
          id: category,
        },
        locale,
      });
    });
  }

  return paths;
}

export async function getPostsOfCategory(category, locale) {
  const categoriesWithPosts = getCategoriesWithPosts(locale);
  return categoriesWithPosts[category];
}
