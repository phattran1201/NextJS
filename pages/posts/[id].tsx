import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { getListPost } from "../api/posts";

export async function getStaticProps({ params }) {
  const postData = await getListPost(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getListPost();
  return {
    paths: paths.map((v: { id: { toString: () => any } }) => {
      return {
        params: {
          id: v?.id?.toString(),
        },
      };
    }),
    fallback: false,
  };
}
export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          <p className={utilStyles.headingLg}>{postData?.tags.join(" - ")}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.body }} />
      </article>
    </Layout>
  );
}
