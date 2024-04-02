import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps({ locale }) {
  const allPostsData = getSortedPostsData();

  const greeting = locale === 'de' ? "Ich helfe dir bei Software." : "I'll help you with software."

  return {
    props: {
      allPostsData,
      greeting,
    },
  };
}

export default function Home(props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{props.greeting}</p>
        <ul>
          <li>interaktive Webseiten, z.B. Experimente mit <a href="http://www.otree.org/">oTree</a></li>
          <li>Skripte zum Konvertieren oder Auswerten von Daten</li>
          <li>Hosting, Serverinfrastruktur, Domainregistrierung</li>
        </ul>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Kontakt</h2>
        <ul>
          <li><a rel="me" href="https://mastodon.social/@jo3rn">Mastodon</a></li>
          <li><a href="https://www.linkedin.com/in/jo3rn">LinkedIn</a></li>
          <li><a href="mailto:website@jo3rn.de">website@jo3rn.de</a></li>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Neue Blog Einträge</h2>
        <ul className={utilStyles.list}>
          {props.allPostsData.slice(0, 3).map(({ category, id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/blog/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} /> ~~ {category}
              </small>
            </li>
          ))}
        </ul>
        <Link href="/blog">zum Blog</Link>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Portfolio</h2>
        <ul>
          <li><a href="https://github.com/jo3rn/KidsCOOP">Public Goods Experiment</a></li>
          <li><a href="https://github.com/jo3rn/oTree-apps">Devil's Task, Frog Jump & Time Preference</a></li>
          <li><a href="https://github.com/jo3rn/oTree_FFM">Nudging Experiment</a></li>
          <li>weitere auf Anfrage</li>
        </ul>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Erfolgreiche Kooperationen</h2>
        <div className={utilStyles.coops}>
          <span>
            <Link href="https://www.uni-frankfurt.de/">
              <Image
                src="/images/cooperations/goethe.png"
                height={144}
                width={144}
                alt="Logo of Goethe University Frankfurt am Main"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.uni-mainz.de/">
              <Image
                src="/images/cooperations/mainz.png"
                height={144}
                width={144}
                alt="Logo of Johannes Gutenberg University Mainz"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.ku.dk/">
              <Image
                src="/images/cooperations/copenhagen.png"
                height={144}
                width={144}
                alt="Logo of University of Copenhagen"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.hs-fulda.de/">
              <Image
                src="/images/cooperations/fulda.svg"
                height={144}
                width={144}
                alt="Logo of University of Applied Sciences Fulda"
              />
            </Link>
          </span>
          <span>
            <Link href="https://www.uni-koeln.de/">
              <Image
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
