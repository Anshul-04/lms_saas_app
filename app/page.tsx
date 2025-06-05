import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";

// This is the Home page of the application, where we display popular companions and a list of all companions.
const Page = () => {
  return (
    
    <main>
      <h1>Popular Companion</h1>

      {/** This section displays popular companions with their details like name, topic, subject,
           duration, and a button to launch the lesson. 
       */
      }    
      <section className="home-section">        
        <CompanionCard
          id="123"
          name="Neura the Prainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="456"
          name="Countsy the number Wizard"
          topic="Derivaties and Integrals"
          subject="Math"
          duration={30}
          color="#e5d0ff"
        />
        <CompanionCard
          id="789"
          name="Verba the Vocabulary Builder"
          topic="language and Grammar"
          subject="English Literature"
          duration={30}
          color="#BDE7FF"
        />
      </section>
       
      {/** This section displays a list of all companions and a call to action (CTA) button. */}
      <section className="home-section">
        <CompanionsList />
        <CTA />
      </section>

    </main>
  );
};

export default Page;
