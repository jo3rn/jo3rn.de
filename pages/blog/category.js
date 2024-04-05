import Head from "next/head";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { FaTag } from "react-icons/fa/";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getCategoriesWithPosts } from "../../lib/category";

export async function getStaticProps({ locale }) {
  const categoriesWithPosts = getCategoriesWithPosts(locale);
  return {
    props: {
      categoriesWithPosts,
    },
  };
}

export default function Categories({ categoriesWithPosts }) {
  const { t, lang } = useTranslation();

  return (
    <Layout>
      <Head>
        <title>{`${t("common:categories")} - ${siteTitle}`}</title>
      </Head>
      <h1 className={utilStyles.headingLg}>{`${t(
        "common:category-heading"
      )}`}</h1>

      {Object.keys(categoriesWithPosts)
        .sort()
        .map((category, index) => {
          return (
            <section key={category}>
              <h2 className={utilStyles.headingMd}>
                <FaTag className={utilStyles.icon} />
                &nbsp;
                {category}
              </h2>
              <ul className={utilStyles.listCircle}>
                {categoriesWithPosts[category].map(({ id, title }) => (
                  <li className={utilStyles.listItem} key={id}>
                    <Link
                      href={`/blog/${id}`}
                      className={`${utilStyles.noDecoration} ${utilStyles.linkLight}`}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
    </Layout>
  );
}
