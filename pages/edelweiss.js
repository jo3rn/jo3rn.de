import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Edelweiss() {
    return (
        <Layout>
            <Head>
                <title>SSV Edelweiß - {siteTitle}</title>
            </Head>
            <h1 className={utilStyles.headingLg}>SSV Edelweiß</h1>
            <h2 className={utilStyles.headingMd}>Ewige Tabelle</h2>

            <table className={utilStyles.table}>
                <thead>
                    <tr>
                        <th>P</th>
                        <th>S</th>
                        <th>Name</th>
                        <th>Punkte</th>
                        <th>Schnitt</th>
                        <th>SI</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>8</td>
                        <td>Daniel ****</td>
                        <td>7878</td>
                        <td>985</td>
                        <td>80.11</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>4</td>
                        <td>Kevin Vor</td>
                        <td>3813</td>
                        <td>953</td>
                        <td>77.25</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>Bassmann *</td>
                        <td>3735</td>
                        <td>934</td>
                        <td>75.40</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>8</td>
                        <td>Nico ~</td>
                        <td>7389</td>
                        <td>924</td>
                        <td>73.68</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>4</td>
                        <td>Andi Stey §</td>
                        <td>3747</td>
                        <td>937</td>
                        <td>69.89</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>8</td>
                        <td>Julian *</td>
                        <td>7570</td>
                        <td>946</td>
                        <td>69.15</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>7</td>
                        <td>Marv §~**</td>
                        <td>6543</td>
                        <td>935</td>
                        <td>66.44</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>6</td>
                        <td>Flo</td>
                        <td>4946</td>
                        <td>824</td>
                        <td>56.26</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>5</td>
                        <td>Oliver Müller ~</td>
                        <td>4190</td>
                        <td>838</td>
                        <td>51.78</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>5</td>
                        <td>Maxi ~~</td>
                        <td>3829</td>
                        <td>766</td>
                        <td>48.24</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>6</td>
                        <td>Konstantin ~§</td>
                        <td>4781</td>
                        <td>797</td>
                        <td>47.23</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>8</td>
                        <td>Jö !~§!§</td>
                        <td>6003</td>
                        <td>750</td>
                        <td>39.74</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>6</td>
                        <td>Lukas §~~!</td>
                        <td>4108</td>
                        <td>685</td>
                        <td>33.92</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>6</td>
                        <td>Andi Wess !</td>
                        <td>4117</td>
                        <td>686</td>
                        <td>32.59</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>8</td>
                        <td>Manu P ~~~~~~</td>
                        <td>5481</td>
                        <td>685</td>
                        <td>26.04</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>8</td>
                        <td>Jannik !~~!</td>
                        <td>5308</td>
                        <td>664</td>
                        <td>21.76</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>5</td>
                        <td>Lucas ~~~</td>
                        <td>3484</td>
                        <td>697</td>
                        <td>20.97</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td>4</td>
                        <td>Louis !!~</td>
                        <td>2085</td>
                        <td>521</td>
                        <td>09.01</td>
                    </tr>

                </tbody>
            </table>

            <h3>Legende</h3>

            <table>
                <tbody>
                    <tr>
                        <td>*</td>
                        <td>Meisterschale</td>
                    </tr>
                    <tr>
                        <td>$</td>
                        <td>Managerlehrling</td>
                    </tr>
                    <tr>
                        <td>~</td>
                        <td>mit-austragend beim Abschlussfest</td>
                    </tr>
                    <tr>
                        <td>!</td>
                        <td>Rote Laterne</td>
                    </tr>
                </tbody>
            </table>

            <p>
                Der Sieger-Index (SI) gibt an, wieviele Mananger der jeweilige Manager im Schnitt prozentual hinter sich lässt. Er ist somit der invertierte Verlierer-Index.
            </p>

            <h3>Rekorde</h3>

            <table className={utilStyles.table}>
                <thead>
                    <tr>
                        <th>Rekord</th>
                        <th></th>
                        <th>Manager</th>
                        <th>Saison</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Höchste Punktzahl insgesamt</td>
                        <td>7878</td>
                        <td>Daniel</td>
                        <td>2022/2023</td>
                    </tr>
                    <tr>
                        <td>Höchste Punktzahl in Saison</td>
                        <td>1305</td>
                        <td>Bassmann</td>
                        <td>2018/2019</td>
                    </tr>
                    <tr>
                        <td>Niedrigste Punktzahl in Saison</td>
                        <td>410</td>
                        <td>Louis</td>
                        <td>2018/2019</td>
                    </tr>
                    <tr>
                        <td>Höchster Punktedurchschnitt</td>
                        <td>1067</td>
                        <td>Andi Stey</td>
                        <td>2019/2020</td>
                    </tr>
                    <tr>
                        <td>Längste Titelverteidigung</td>
                        <td>1</td>
                        <td>mehrere</td>
                        <td>mehrere</td>
                    </tr>
                    <tr>
                        <td>Höchste Anzahl Manager</td>
                        <td>18</td>
                        <td></td>
                        <td>2019/2020</td>
                    </tr>
                    <tr>
                        <td>Niedrigste Anzahl Manager</td>
                        <td>7</td>
                        <td></td>
                        <td>2015/2016</td>
                    </tr>
                </tbody>
            </table>

            <h2 className={utilStyles.headingMd}>Hymne</h2>

            <p>Comunio, Comunio<br />
                Wie schön sind deine Spieler<br />
                Der Marktwert steigt zur Sommerzeit<br />
                Und auch im Winter wenn es schneit<br />
                Comunio, Comunio<br />
                Wie schön sind deine Spieler<br />
                <br />
                Comunio, Comunio<br />
                Dein Kader lässt sich sehen<br />
                Die Karte rot, das Konto blank<br />
                Der Toptransfer nur auf der Bank<br />
                Comunio, Comunio<br />
                Dein Kader ließ sich sehen<br />
                <br />
                Comunio, Comunio<br />
                Du sammelst wenig Punkte<br />
                Und plagt dich das Verletzungspech<br />
                Singst du auf deinem Abschlussfest<br />
                Comunio, Comunio<br />
                ich hab zu wenig Punkte
            </p>
        </Layout>

    );
}
