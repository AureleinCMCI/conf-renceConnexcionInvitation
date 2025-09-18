
import Image from "next/image";
import styles from "./page.module.css";
import InscriptionForm from "../../component/InscriptionForm";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <InscriptionForm />
      </main>
    </div>
  );
}
