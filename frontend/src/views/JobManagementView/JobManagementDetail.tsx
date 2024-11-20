import { Button, Loader, Select } from "@/components";
import { useTranslation } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import { handymanService } from "@/services/handymanService";
import { jobPetitionService } from "@/services/jobPetitionService";
import { jobStatsService } from "@/services/jobStatsService";
import { IHandyManRecord } from "@/types/handyman";
import { IJobPetitionRecord } from "@/types/jobPetition";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobManagementDetail = () => {
  const { id } = useParams();
  const [petition, setPetition] = useState<IJobPetitionRecord | null>(null);
  const [handyManList, setHandyManList] = useState<IHandyManRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation({
    ns: ["jobPetitionManagement", "categories", "common"],
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      jobPetitionService.getDetailedById(id).then((response) => {
        const petitionResponse = response.data;
        setPetition(petitionResponse);

        if (petitionResponse) {
          handymanService
            .list(100, 0, {
              services: [petitionResponse.service],
              availability: [petitionResponse.availability],
            })
            .then((response) => {
              setHandyManList(response.data.data);
              setLoading(false);
            });
        }
      });
    }
  }, [id]);

  const handleHandyManChange = (
    handyManId: string,
    petition: IJobPetitionRecord
  ) => {
    setPetition({ ...petition, handyManId });
    jobPetitionService
      .update(petition._id, {
        handyManId,
        status: "assignated",
      })
      .then(() => {
        jobStatsService
          .create({
            handyManId,
            jobPetitionId: petition._id,
            rating: 0,
          })
          .then(() => {
            navigate(`/job-petitions/${petition._id}`);
          });
      });
  };

  const statusColor = {
    pending: "text-warning",
    assignated: "text-success",
    rejected: "text-error",
    completed: "text-accent",
  };

  return (
    <MainLayout>
      {loading && <Loader fullScreen variant="accent" size="lg" />}
      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {t("jobPetitionManagement:jobPetitionDetails")}
            </h1>
          </div>
        </div>
        {petition && (
          <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <p className="text-foreground/60 mb-1 md:mb-4">
                {t("jobPetitionManagement:requestedBy")}:
              </p>
              <p className="text-foreground">{petition.userName}</p>
            </div>

            <hr className="border-secondary/20 my-1" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <p className="text-foreground/60 mb-1 md:mb-4">
                {t("jobPetitionManagement:service")}:
              </p>
              <p className="text-foreground">
                {t(`categories:services.${petition.service}`)}
              </p>
            </div>

            <hr className="border-secondary/20 my-1" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <p className="text-foreground/60 mb-1 md:mb-4">
                {t("jobPetitionManagement:description")}:
              </p>
              <p className="text-foreground">{petition.description}</p>
            </div>

            <hr className="border-secondary/20 my-2 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <p className="text-foreground/60 mb-1 md:mb-4">
                {t("jobPetitionManagement:askedDay")}:
              </p>
              <p className="text-foreground">
                {`${moment(petition.date).format("DD/MM/YYYY")} (${t(
                  `categories:availability.${petition.availability}`
                )})`}
              </p>
            </div>

            <hr className="border-secondary/20 my-1" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <p className="text-foreground/60 mb-1 md:mb-4">
                {t("jobPetitionManagement:time")}:
              </p>
              <p className="text-foreground">{petition.time}</p>
            </div>

            <hr className="border-secondary/20 my-2 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <p className="text-foreground/60 mb-1 md:mb-4">
                {t("jobPetitionManagement:status")}:
              </p>
              <p
                className={`${
                  petition.status
                    ? statusColor[petition.status]
                    : "text-foreground"
                }`}
              >
                {t(`categories:jobPetitionStatus.${petition.status}`)}
              </p>
            </div>

            <hr className="border-secondary/20 my-2 w-full" />

            {handyManList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <p className="text-foreground/60 mb-1 md:mb-4">
                  {t("jobPetitionManagement:handyman")}:
                </p>
                <Select
                  options={handyManList.map((handyMan) => {
                    return {
                      value: handyMan._id,
                      label: `${handyMan.firstName} ${handyMan.lastName} - (${
                        handyMan.rating || "0"
                      } ⭐) - (${handyMan.jobsCount || "0"} trabajos)`,
                    };
                  })}
                  value={petition.handyManId}
                  searchable
                  disabled={
                    petition.status === "completed" ||
                    petition.status === "rejected"
                  }
                  onChange={(value) =>
                    handleHandyManChange(value as string, petition)
                  }
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <p className="text-foreground/60 mb-1 md:mb-4">
                  {t("jobPetitionManagement:handyman")}:
                </p>
                <p className="text-foreground">
                  {t("jobPetitionManagement:noHandyman")}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="transparent"
            disabled={loading}
            onClick={() => navigate("/job-petitions")}
          >
            {t("common:buttons.back")}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobManagementDetail;
