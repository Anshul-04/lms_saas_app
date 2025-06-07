import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";

import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";

import { getSubjectColor } from "@/lib/utils";

// This is the Home page of the application, where we display popular companions and a list of all companions.
const Page = async () => {
  const companions = await getAllCompanions({limit:3});
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1>Popular Companion</h1>

      {/** This section displays popular companions with their details like name, topic, subject,
           duration, and a button to launch the lesson. 
       */}
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      {/** This section displays a list of all companions and a call to action (CTA) button. */}
      <section className="home-section">
        <CompanionsList
          title="Recently Completed Sessions"
          companions={recentSessionsCompanions} // This should be an array of companion objects
          className="w-2/3 mx-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
function getAllCompanion(arg0: { limit: number }) {
  throw new Error("Function not implemented.");
}
