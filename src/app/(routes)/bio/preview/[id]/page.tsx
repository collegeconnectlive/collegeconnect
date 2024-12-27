import PreviewPost from "@/pages/(logged-in)/PreviewPost";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const schoolID = (await params).id;

  return (
    <div className="bg-gradient-to-tr from-rose-100 to-teal-100 z-20">
      <PreviewPost schoolID={schoolID} />
    </div>
  );
}
