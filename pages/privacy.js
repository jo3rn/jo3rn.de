import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Privacy() {
    return (
        <Layout>
            <Head>
                <title>Datenschutz - {siteTitle}</title>
            </Head>
            <h1 className={utilStyles.headingLg}>Datenschutz</h1>
            <h2>Welche personenbezogenen Daten wir sammeln und warum wir sie sammeln</h2>
            <h3>Eingebettete Inhalte von anderen Websites</h3>
            <p>
                Beiträge auf dieser Website können eingebettete Inhalte beinhalten (z. B. Videos, Bilder, Beiträge etc.). Eingebettete Inhalte von anderen Websites verhalten sich exakt so, als ob der Besucher die andere Website besucht hätte.
            </p>

            <p>
                Diese Websites können Daten über dich sammeln, Cookies benutzen, zusätzliche Tracking-Dienste von Dritten einbetten und deine Interaktion mit diesem eingebetteten Inhalt aufzeichnen, inklusive deiner Interaktion mit dem eingebetteten Inhalt, falls du ein Konto hast und auf dieser Website angemeldet bist.
            </p>
        </Layout>

    );
}
