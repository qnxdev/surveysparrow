import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [plus50Ms, setPlus50Ms] = useState(false);
  const [avgResponse, setAvgResponse] = useState(0);

  const checkResponse = async (e) => {
    if (url != "") {
      const res = await fetch(`/api/monitor?url=${encodeURIComponent(url)}`);
      let { time } = await res.json();
      //setting average response time
      setAvgResponse(avgResponse >= 0 ? time : (avgResponse + time) / 2);
      setPlus50Ms(avgResponse < 50);
      //setting 5minute interval
      setInterval(checkResponse, 300000);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SurveySparrow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h2>SurveySparrow</h2>
      </header>
      <main className={styles.main}>
        <div>
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            name="url"
            id="url"
            placeholder="Enter URL including 'http://'"
            className={styles.input}
          />
          <button className={styles.button} onClick={checkResponse}>
            Start
          </button>
        </div>
        {plus50Ms && <h4>Your URL is taking more than 50ms to respond</h4>}
        {avgResponse > 0 && (
          <div>
            <h3>Average Response time: {avgResponse} ms</h3>
            <p>Monitoring in progress..</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://surveysparrow.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>SurveySparrow</span>
        </a>
      </footer>
    </div>
  );
}
