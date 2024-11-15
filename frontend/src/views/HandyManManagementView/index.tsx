import Button from "../../components/Button";
import Card from "../../components/Card";
import MainLayout from "../../layouts/MainLayout";

const HandyManManagementView = () => {
  const handyMen = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
      expertise: "Web Developer",
      availability: ["Online", "Offline"],
      services: ["Web Design", "Web Development", "Mobile Development"],
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      phone: "123456789",
      expertise: "Web Developer",
      availability: ["Online", "Offline"],
      services: ["Web Design", "Web Development", "Mobile Development"],
    },
    {
      id: "3",
      firstName: "Abner",
      lastName: "Rey",
      phone: "123456789",
      expertise: "Web Developer",
      availability: ["Online", "Offline"],
      services: ["Web Design", "Web Development", "Mobile Development"],
    },
    {
      id: "4",
      firstName: "John",
      lastName: "Smith",
      phone: "123456789",
      expertise: "Web Developer",
      availability: ["Online", "Offline"],
      services: ["Web Design", "Web Development", "Mobile Development"],
    },
    {
      id: "5",
      firstName: "Jane",
      lastName: "Smith",
      phone: "123456789",
      expertise: "Web Developer",
      availability: ["Online", "Offline"],
      services: ["Web Design", "Web Development", "Mobile Development"],
    },
  ];
  return (
    <MainLayout className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Handyman Management</h1>
        <p className="text-sm text-foreground/60">
          Here you can manage your handyman services
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-bold">Add Handyman</h1>
          <Button variant="accent">Add Handyman</Button>
        </div>
      </div>
      <div className="flex flex-row gap-8 w-full flex-wrap items-center">
        {handyMen.map((handyMan) => (
          <Card
            className="w-full md:w-1/4 flex-grow-1"
            key={handyMan.id}
            variant="primary"
            title={handyMan.firstName + " " + handyMan.lastName}
          >
            <div key={handyMan.id} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-foreground/60">Phone:</p>
                <p className="text-sm">{handyMan.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-foreground/60">Expertise:</p>
                <p className="text-sm">{handyMan.expertise}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-foreground/60">Availability:</p>
                <p className="text-sm">{handyMan.availability.join(", ")}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-foreground/60">Services:</p>
                <p className="text-sm">{handyMan.services.join(", ")}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default HandyManManagementView;
