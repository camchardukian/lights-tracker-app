import Head from "next/head";
import Table from "../components/Table";
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
        <Table></Table>
      </main>
    </div>
  );
}
