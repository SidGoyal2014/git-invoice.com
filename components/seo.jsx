import { NextSeo } from "next-seo";

const IndexPage = () => {
  const NEXTAUTH_URL =
    process.env.NEXTAUTH_URL || "https://www.git-invoice.com/"; // Replace with your actual domain

  return (
    <>
      <NextSeo
        title="Git Invoice | Effortless Invoicing for Freelancers"
        description="Transform your GitHub pull requests and commits into professional invoices effortlessly with Git Invoice, designed for freelancers and developers."
        canonical={NEXTAUTH_URL}
        openGraph={{
          url: NEXTAUTH_URL,
          title: "Git Invoice | Effortless Invoicing for Freelancers",
          description:
            "Transform your GitHub pull requests and commits into professional invoices effortlessly with Git Invoice, designed for freelancers and developers.",
          site_name: "Git Invoice",
          images: [
            {
              url: "https://www.git-invoice.com/sc2.png", // Absolute URL
              alt: "Git Invoice - Effortless Invoicing for Freelancers", // Optional, specify alt text
            },
          ],
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />
    </>
  );
};

export default IndexPage;
