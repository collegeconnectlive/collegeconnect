import prisma from "@/lib/db";

// type StudentData = {
//     id: string;
//     name: string;
//     bio: string;
//     phoneNumber: string;
//     universityId: string;
// };


export default async function Verification({ params }: { params: { id: string } }) {
    const studentData = await prisma.student.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!studentData) {
        return (
            <div className="p-6 text-center">
                Student not found.
            </div>
        );
    }

    return (
        <div className="p-6 text-center">
            {studentData.name}
        </div>
    );
};
