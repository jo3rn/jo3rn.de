import { getSortedPostsData } from "./posts";

const allPostsData = getSortedPostsData();

function createSlug(phrase) {
  return phrase.replace(" ", "-");
}

export function getCategoriesWithPosts() {
  const categoriesWithPosts = {}
  allPostsData.map(({ category, id, title }) => {
    const categorySlug = createSlug(category)
    categoriesWithPosts[categorySlug] = categoriesWithPosts[categorySlug] || []
    categoriesWithPosts[categorySlug].push({ id: id, title: title, category: category })
  })

  return categoriesWithPosts;
}

export function getAllCategoryIds() {
  const categories = new Set();

  allPostsData.map(({ category }) => {
    const categorySlug = createSlug(category)
    categories.add(categorySlug)
  })
  return [...categories].map(category => {
    return {
      params: {
        id: category,
      }
    }
  })
}

export async function getPostsOfCategory(category) {
  const categoriesWithPosts = getCategoriesWithPosts()
  return categoriesWithPosts[category]
}