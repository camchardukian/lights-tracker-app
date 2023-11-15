import Head from "next/head";
import App from "../components/App";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lights Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Lights Tracker Application</h1>
        <App />
      </main>
    </div>
  );
}
