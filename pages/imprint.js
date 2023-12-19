import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Imprint() {
    return (
        <Layout>
            <Head>
                <title>Impressum - {siteTitle}</title>
            </Head>
            <h1 className={utilStyles.headingLg}>Impressum</h1>
            <h2 className={utilStyles.headingLg}>Angaben gemäß § 5 TMG</h2>
            <p>
                Jörn Auerbach<br />
                Gartenstr. 9<br />
                36103 Flieden<br />
                E-Mail: impressum@jo3rn.de<br />
            </p>

            <h2 className={utilStyles.headingLg}>Widerspruch Werbung</h2>
            <p>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>
        </Layout>

    );
}
