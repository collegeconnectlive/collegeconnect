import HomeScreen from "@/pages/(logged-in)/HomeScreen";
import { FetchSchool } from "@/app/api/(fetchSchools)/FetchSchool";
import { FetchSchools } from "@/app/api/(fetchSchools)/FetchSchools";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string }>; // Make slug optional
}) {
  const slug = (await params)?.slug;

  // Fetch both schools and a specific school in parallel
  const [schools, school] = await Promise.all([
    FetchSchools().catch((error) => {
      console.error("Error fetching schools:", error);
      return []; // Return an empty array on failure
    }),
    slug
      ? FetchSchool(slug[0]).catch((error) => {
          console.error("Error fetching school:", error);
          return null; // Return null on failure
        })
      : Promise.resolve(null), // Skip fetching if slug is undefined
  ]);

  return (
    <div className="bg-gradient-to-tr from-rose-100 to-teal-100 ">
      <HomeScreen schools={schools} school={school} />
    </div>
  );
}
