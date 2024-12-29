import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";

const postsDir = path.join(process.cwd(), "content", "posts");

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDir);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.mdx$/, "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filepath = path.join(postsDir, `${params.slug}.mdx`);
  const fileContent = fs.readFileSync(filepath, "utf8");

  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content);

  return {
    props: {
      mdxSource,
      frontMatter: data,
    },
  };
}

export default function PostPage({ mdxSource, frontMatter }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontMatter.title,
    description: frontMatter.description,
    author: {
      "@type": "Person",
      name: frontMatter.author,
    },
    datePublished: frontMatter.date,
    dateModified: frontMatter.date,
    publisher: {
      "@type": "Organization",
      name: "Your Site Name",
    },
  };

  return (
    <>
      <NextSeo
        title={frontMatter.title || "Post"}
        description={frontMatter.description || "Read our latest post."}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.description,
          type: "article",
          article: {
            publishedTime: frontMatter.date,
            authors: [frontMatter.author],
          },
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@YourTwitterHandle",
          title: frontMatter.title,
          description: frontMatter.description,
        }}
        additionalMetaTags={[
          {
            property: "article:published_time",
            content: frontMatter.date,
          },
        ]}
        additionalJsonLd={[structuredData]}
      />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <main className="prose prose-lg prose-indigo mx-auto">
          <MDXRemote {...mdxSource} />
        </main>
      </div>
    </>
  );
}
