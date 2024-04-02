import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { clsx } from "clsx";
import styles from "./category.module.css";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";

export async function getStaticProps({ params, locale }) {
  const postData = await getPostData(params.id, locale);
  return {
    props: {
      postData,
      locale,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const paths = getAllPostIds(locales);
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData, locale }) {
  return (
    <Layout blogPost>
      <Head>
        <title>{postData.title} - jo3rn.de</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        <a className={styles.tagLink} href={"category/" + postData.category.replace(" ", "-")}>
          <span
            className={`${clsx({
              [styles.coffee]: postData.category === "coffee table",
              [styles.computer_science]: postData.category === "computer science",
              [styles.innovation]: postData.category === "innovation",
              [styles.rant]: postData.category === "rant",
              [styles.recommendation]: postData.category === "recommendation",
              [styles.security]: postData.category === "security",
              [styles.software]: postData.category === "software engineering",
              [styles.web]: postData.category === "web",
            })} ${styles.category}`}
          >
            {postData.category}
          </span>
        </a>

        <div className={`${utilStyles.lightText} ${styles.date}`}>
          <Date dateString={postData.date} locale={locale} />
        </div>

        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
}
