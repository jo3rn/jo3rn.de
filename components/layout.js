import Head from "next/head";
import Image from "next/image";
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TbLamp, TbLampOff } from "react-icons/tb";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Jörn Auerbach";
export const siteTitle = "jo3rn.de - utilize technology";

export default function Layout({ children, home, blogPost }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`Personal website of ${name}`}
        />
        <meta property="og:image" content="/images/profile.jpg" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt="AI created image of Jörn Auerbach"
            />
            <div className={utilStyles.heading2Xl}>{name}</div>
          </>
        ) : (
          <>
            <Link href="/" className={`${utilStyles.headingHeader} ${utilStyles.noDecoration}`}>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt="AI created image of Jörn Auerbach"
              />
            </Link>
          </>
        )}
      </header>
      <main>{children}</main>
      {blogPost && (
        <div className={styles.backToHome}>
          <Link href="/blog">← Zum Blog</Link>
        </div>
      )}
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Zur Startseite</Link>
        </div>
      )}
      <footer>
        <ul>
          <li>
            <Link href="/blog">blog</Link>
          </li>
          <li>
            •
          </li>
          <li>
            <Link href="/imprint">impressum</Link>
          </li>
          <li>
            •
          </li>
          <li>
            <Link href="/privacy">datenschutz</Link>
          </li>
          <li>
            •
          </li>
          <li>
            <a href="https://ko-fi.com/jo3rn">support me</a>
          </li>
          { mounted && (
            <>
            •
                {theme == 'light' ? (
                  <li className={styles.themeToggle} onClick={() => setTheme('dark')}>
                    <TbLampOff /> Licht aus
                  </li>
                ) : (
                  <li className={styles.themeToggle} onClick={() => setTheme('light')}>
                    <TbLamp /> Licht an
                  </li>
                )}
            </>
          )}
        </ul>
      </footer>
    </div>
  );
}
