
import { FetchStudentPost } from "@/app/api/(previewPost)/FetchStudentPost";
// import PreviewPage from "@/pages/(logged-in)/PreviewPost";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const studentId = (await params).id;
  console.log(studentId);
  // Fetch the specific submission
  const submission = await FetchStudentPost(studentId).catch((error) => {
    console.error("Error fetching submission:", error);
    return null; // Return null on failure
  });
  console.log(submission);
  return (
    <div className="h-[100%] bg-gradient-to-tr from-rose-100 to-teal-100 z-20">
      {/* <PreviewPage submission={submission} /> */}
    </div>
  );
}
