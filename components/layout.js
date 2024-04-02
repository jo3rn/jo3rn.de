import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
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
  const router = useRouter();
  const { t, lang } = useTranslation()
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
          <Link href="/blog">← {t('common:layout-link-to-blog')}</Link>
        </div>
      )}
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← {t('common:layout-link-to-home')}</Link>
        </div>
      )}
      <footer>
        <ul>
          <li key="footer-blog">
            <Link href="/blog">{t('common:layout-footer-blog')}</Link>
          </li>
          <li key="footer-divider-1">
            •
          </li>
          <li key="footer-imprint">
            <Link href="/imprint">{t('common:layout-footer-imprint')}</Link>
          </li>
          <li key="footer-divider-2">
            •
          </li>
          <li key="footer-privacy">
            <Link href="/privacy">{t('common:layout-footer-privacy')}</Link>
          </li>
          <li key="footer-divider-3">
            •
          </li>
          <li key="footer-support">
            <a href="https://ko-fi.com/jo3rn">{t('common:layout-footer-support')}</a>
          </li>
        </ul>

        <ul>
          <li key={`footer-${router.locales[0]}`}>
            <Link href={router.asPath} locale={router.locales[0]}>
              {t(`common:layout-footer-locale-${router.locales[0]}`)}
            </Link>
          </li>
          <li key="footer-locale-divider">•</li>
          <li key={`footer-${router.locales[1]}`}>
            <Link href={router.asPath} locale={router.locales[1]}>
              {t(`common:layout-footer-locale-${router.locales[1]}`)}
            </Link>
          </li>
        </ul>

        { mounted && (
          <ul>
            {theme == 'light' ? (
              <li className={styles.themeToggle} onClick={() => setTheme('dark')} key="footer-lights-off">
                <TbLampOff /> {t('common:layout-footer-lights-off')}
              </li>
            ) : (
              <li className={styles.themeToggle} onClick={() => setTheme('light')} key="footer-lights-on">
                <TbLamp /> {t('common:layout-footer-lights-on')}
              </li>
            )}
          </ul>
        )}
      </footer>
    </div>
  );
}
