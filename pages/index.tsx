import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getListPost } from "./api/posts";
export async function getStaticProps() {
  const listPost = await getListPost();
  return {
    props: {
      listPost,
    },
  };
}

export default function Home({ listPost }) {
  console.log(
    "🚀 phat.log ~ file: index.tsx:25 ~ process.env.NODE_ENV:",
    process.env,
    process.env.NODE_ENV
  );

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>----{process.env.ENV_TITLE}----</p>
        <p>----[{process.env.ENV_TITLE}]----</p>
        <p>----[{process.env.NODE_ENV}]----</p>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {listPost?.map(({ id, date, title, userId, tags }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
                <p className={utilStyles.headingLg}>{tags.join(" - ")}</p>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
