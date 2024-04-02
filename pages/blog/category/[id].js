import Head from "next/head";
import Layout from "../../../components/layout";
import { getAllCategoryIds, getPostsOfCategory } from "../../../lib/category";
import { clsx } from "clsx";
import styles from "../category.module.css";
import utilStyles from "../../../styles/utils.module.css";
import Date from "../../../components/date";

export async function getStaticProps({ params, locale }) {
    const categoryWithPosts = await getPostsOfCategory(params.id, locale)
    return {
        props: {
            categoryWithPosts,
        },
    };
}

export async function getStaticPaths({ locales }) {
    const paths = getAllCategoryIds(locales);
    return {
        paths,
        fallback: false,
    };
}

export default function Category({ categoryWithPosts }) {
    console.log(categoryWithPosts)
    const category = categoryWithPosts[0].category
    return (
        <Layout>
            <Head>
                <title>{category} - jo3rn.de</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>Posts mit Kategorie: {category}</h1>

                <span
                    className={`${clsx({
                        [styles.coffee]: category === "coffee table",
                        [styles.computer_science]: category === "computer science",
                        [styles.innovation]: category === "innovation",
                        [styles.rant]: category === "rant",
                        [styles.recommendation]: category === "recommendation",
                        [styles.security]: category === "security",
                        [styles.software]: category === "software engineering",
                        [styles.web]: category === "web",
                    })} ${styles.category}`}
                >{category}
                </span>

                <ul>
                    {categoryWithPosts.map((post, i) => {
                        console.log(post)
                        console.log(i)
                        return (<li><a href={"/blog/" + post.id}>{post.title}</a></li>)
                    })}
                </ul>
                <div className={`${utilStyles.lightText} ${styles.date}`}>
                    {/* <Date dateString={categoryWithPosts.date} /> */}
                </div>

                <br />
                <div dangerouslySetInnerHTML={{ __html: categoryWithPosts.contentHtml }}></div>
            </article>
        </Layout>
    );
}
