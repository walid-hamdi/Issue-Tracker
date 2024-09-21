import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueLoadingSkeleton from "../_components/IssueFormSkelton";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Create New Issues Seamlessly: Dynamic Form with Real-Time Loading",
  description:
    "Instantly create and manage new issues with a dynamic, real-time issue form built using Next.js. Enjoy smooth interactions with server-side rendering disabled and a custom loading skeleton to enhance user experience.",
};

export default NewIssuePage;
