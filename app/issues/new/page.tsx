import dynamic from "next/dynamic";
import IssueLoadingSkeleton from "../_components/IssueFormSkelton";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
