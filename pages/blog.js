import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps({ locale }) {
  const allPostsData = getSortedPostsData(locale);
  return {
    props: {
      allPostsData,
      locale,
    },
  };
}

export default function Home({ allPostsData, locale }) {
  return (
    <Layout>
      <Head>
        <title>Blog - {siteTitle}</title>
      </Head>

      <h1 className={utilStyles.headingLg}>Blog</h1>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ category, id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/blog/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} locale={locale} /> ~~ {category}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
