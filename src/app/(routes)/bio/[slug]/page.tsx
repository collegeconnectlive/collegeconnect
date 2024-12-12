import HomeScreen from "@/pages/(logged-in)/HomeScreen";
import { FetchSchool } from "@/utils/FetchSchool";
import { FetchSchools } from "@/utils/FetchSchools";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; 
  
  const schools = await FetchSchools(); // Fetch the schools on the server
  const school = await FetchSchool(slug)
  return (
    <div className="h-[100%] bg-gradient-to-tr from-rose-100 to-teal-100">
      <HomeScreen schools={schools} school = {school} />
    </div>
  );
}
