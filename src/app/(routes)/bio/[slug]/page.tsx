import HomeScreen from "@/pages/(logged-in)/HomeScreen";
import { FetchSchool } from "@/app/api/(fetchSchools)/FetchSchool";
import { FetchSchools } from "@/app/api/(fetchSchools)/FetchSchools";


// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  let schools: string[] = [];
  let school = null;

  try {
    schools = await FetchSchools(); // Fetch the schools on the server
  } catch (error) {
    console.error("Error fetching schools:", error);
    // Handle the error, e.g., log it or show a fallback
  }

  try {
    school = await FetchSchool(slug); // Fetch the specific school using the slug
  } catch (error) {
    console.error("Error fetching school:", error);
    // Handle the error, e.g., log it or show a fallback
  }

  return (
    <div className="h-[100%] bg-gradient-to-tr from-rose-100 to-teal-100 z-20">
      <HomeScreen schools={schools} school={school} />
    </div>
  );
}
