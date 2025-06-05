import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

{
  /** This component renders a card for each companion with their details like name, topic, subject, 
    duration, and a button to launch the lesson.
 */
}


export const CompanionCard = ({ id,name, topic, subject, duration, color,}) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>

      {/** This section displays the subject badge and bookmark icon.  */}
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="Bookmark Icon"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      
      {/** This section displays the companion's name, topic, and duration. */}
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="Clock Icon"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      {/** This section contains a button to launch the lesson for the companion. */}
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
