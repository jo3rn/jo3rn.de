import Head from "next/head";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import DateTimeElement from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home(props) {
  const { t, lang } = useTranslation()

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{t('home:greeting')}</p>
        <ul>
          <li key="greeting-otree"><Trans i18nKey="home:greeting-otree" components={[<a href="http://www.otree.org/" />]} /></li>
          <li key="greeting-scripts">{t('home:greeting-scripts')}</li>
          <li key="greeting-server">{t('home:greeting-server')}</li>
        </ul>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>{t('common:contact')}</h2>
        <ul>
          <li key="mastodon"><a rel="me" href="https://mastodon.social/@jo3rn">Mastodon</a></li>
          <li key="linkedin"><a href="https://www.linkedin.com/in/jo3rn">LinkedIn</a></li>
          <li key="email"><a href="mailto:website@jo3rn.de">website@jo3rn.de</a></li>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{t('home:blog-heading')}</h2>
        <ul className={utilStyles.list}>
          {props.allPostsData.slice(0, 3).map(({ category, id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/blog/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateTimeElement dateString={date} /> ~~ {category}
              </small>
            </li>
          ))}
        </ul>
        <Link href="/blog">{t('home:blog-link')}</Link>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Portfolio</h2>
        <p>{t('home:portfolio-work-since', {years: new Date().getFullYear() - 2014})}</p>
        <ul>
          <li key="portfolio-public-goods"><a href="https://github.com/jo3rn/KidsCOOP">Public Goods Experiment</a></li>
          <li key="portfolio-devils-task"><a href="https://github.com/jo3rn/oTree-apps">Devil's Task, Frog Jump & Time Preference</a></li>
          <li key="portfolio-nudging"><a href="https://github.com/jo3rn/oTree_FFM">Nudging Experiment</a></li>
          <li key="portfolio-other">{t('home:portfolio-other')}</li>
        </ul>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>{t('home:coop-heading')}</h2>
        <div className={utilStyles.coops}>
          <span>
            <Link href="https://www.uni-frankfurt.de/">
              <img
                src="/images/cooperations/goethe.png"
                height={144}
                width={144}
                alt="Logo of Goethe University Frankfurt am Main"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.uni-mainz.de/">
              <img
                src="/images/cooperations/mainz.png"
                height={144}
                width={144}
                alt="Logo of Johannes Gutenberg University Mainz"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.ku.dk/">
              <img
                src="/images/cooperations/copenhagen.png"
                height={144}
                width={144}
                alt="Logo of University of Copenhagen"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.hs-fulda.de/">
              <img
                src="/images/cooperations/fulda.svg"
                height={144}
                width={144}
                alt="Logo of University of Applied Sciences Fulda"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.uni-koeln.de/">
              <img
                src="/images/cooperations/cologne.webp"
                height={144}
                width={144}
                alt="Logo of University of Cologne"
              />
            </Link>
          </span>
        </div>
      </section>

    </Layout>
  );
}
