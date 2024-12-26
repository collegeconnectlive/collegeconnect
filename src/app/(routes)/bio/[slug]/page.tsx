import HomeScreen from "@/pages/(logged-in)/HomeScreen";
import { FetchSchool } from "@/app/api/(fetchSchools)/FetchSchool";
import { FetchSchools } from "@/app/api/(fetchSchools)/FetchSchools";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  // Fetch both schools and a specific school in parallel
  const [schools, school] = await Promise.all([
    FetchSchools().catch((error) => {
      console.error("Error fetching schools:", error);
      return []; // Return an empty array on failure
    }),
    FetchSchool(slug).catch((error) => {
      console.error("Error fetching school:", error);
      return null; // Return null on failure
    }),
  ]);

  return (
    <div>
      <HomeScreen schools={schools} school={school} />
    </div>
  );
}
