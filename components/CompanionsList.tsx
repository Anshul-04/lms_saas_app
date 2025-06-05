import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

{/**
  This component displays a list of recent sessions in a table format.
  It includes a header with column names and maps through the companions array to render each companion's 
  details.
*/}

interface CompanionsListProps {
  title: string;
  companions? : Companion[];   //  Companion is a type  defined in '/types/index.d.ts'
  className? : string;        //  ? means this prop is optional(typescipt feature)
}

const CompanionsList = ({title,companions,className} : CompanionsListProps) => {
  return (
    <article className={cn('companion-list' , className)} >
      <h2 className="font-bold text-3xl">{title}</h2>

      <Table>       

        {/** This  section displays the table header with column names. */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg ">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>            
          </TableRow>          
        </TableHeader>

        <TableBody>

          {/** This section maps through the companions array and renders a TableRow for each companion. */}          
          {companions?.map(({id,subject,name,topic,duration,}) => (
            <TableRow key={id} > 

              {/** 1. This TableCell renders Lesson details and links to the companion's page. */} 
              <TableCell>    

                {/** The Link component is used to navigate to the companion's page with their details. */}            
                <Link href={`/companions/${id}`} > 

                  {/** This section displays the subject icon, name, and topic of the companion in a flex container. */}                 
                  <div className="flex items-center gap-2"> 

                    {/** This section displays the subject icon for the companion in desktop view . */}                    
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }} 
                    >                                         
                      <Image 
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                      />
                    </div>

                    {/** This section displays the name and topic of the companion. */}
                    <div className="flex flex-col gap-2">                      
                      <p className="font-bold text-2xl">
                        {name}
                      </p>
                      <p className="text-lg">
                        {topic}
                      </p>
                    </div>
                  </div>                  
                </Link>
              </TableCell>

              {/** 2. This TableCell displays the subject of the companion. */}
              <TableCell>

                {/** This section displays the subject badge for the companion. */}
                <div className="subject-badge w-fit max-md:hidden ">
                  {subject}
                </div>

                {/** This section displays the subject icon for the companion in a smaller size for mobile view.*/}                
                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image 
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>

              {/** 3.This tablecell displays the duration of the companion's session. */}
              <TableCell>

                <div className="flex items-center gap-2 w-full justify-end"> 
                  <p className="text-2xl"> 
                    {/** This section displays the duration of the companion's session in desktop view.*/}
                    {duration} {' '}
                    <span className="max-md:hidden">mins</span>
                    
                    {/** This section displays the clock icon for the duration in smaller size for mobile view.*/}
                    <Image 
                      src="/icons/clock.svg" alt="minutes " 
                      width={14} height={14} 
                      className="md:hidden" 
                    />
                  </p>
                </div>
              </TableCell>

            </TableRow>
          ))}          
        </TableBody>

      </Table>
    </article>
  );
};

export default CompanionsList;
