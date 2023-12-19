import { remark } from "remark";
import html from "remark-html";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

const getDirectories = (relativePath) => {
  const directory = path.join(process.cwd(), relativePath);
  const directoryNames = fs.readdirSync(directory).filter((fileName) => {
    if (fileName.startsWith("0000", 0)) {
      // exclude drafts
      return false;
    }
    const fullPath = path.join(directory, fileName);
    return fs.lstatSync(fullPath).isDirectory();
  });
  return directoryNames;
};

const getDateOfDirectoryName = (dirName) => {
  const indexOfSeparator = dirName.indexOf("--");
  return dirName.slice(0, indexOfSeparator);
};

const getIdOfDirectoryName = (dirName) => {
  const indexOfSeparator = dirName.indexOf("--");
  return dirName.slice(indexOfSeparator + 2);
};

export function getAllPostIds() {
  // Get directory names under /posts
  const dirNames = getDirectories("posts");
  return dirNames.map((dirName) => {
    const date = getDateOfDirectoryName(dirName);
    const slug = getIdOfDirectoryName(dirName);

    return {
      params: {
        date: date,
        id: slug,
      },
    };
  });
}

export function getSortedPostsData() {
  // Get directory names under /posts
  const dirNames = getDirectories("posts");

  const allPostsData = dirNames.map((dirName) => {
    const date = getDateOfDirectoryName(dirName);
    const id = getIdOfDirectoryName(dirName);

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, dirName, "index.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      date,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id) {
  const dirNames = getDirectories("posts");
  const dirPath = dirNames.find((dir) => dir.endsWith(id));
  const date = getDateOfDirectoryName(dirPath);

  const fullPath = path.join(postsDirectory, dirPath, `index.md`);
  if (fs.lstatSync(fullPath).isDirectory()) {
    return {};
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    date,
    ...matterResult.data,
  };
}
