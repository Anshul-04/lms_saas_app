import Image from 'next/image'
import Link from 'next/link'


{/** 
  This component displays a call-to-action section encouraging users to build a new learning companion.
*/}
const CTA = () => {
  return (
    <section className='cta-section'>
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="text 3-xl font-bold">
        Build and Personalized Larning Companion
      </h2>
      <p>
        Pick a name, subject, voice, & personality - and start
        learning through voice conversation that feel natural and fun.
      </p>

      <Image src="images/cta.svg" alt='cta' width={362} height={232} />

      <button className='btn-primary'>
        <Image src="/icons/plus.svg" alt="Plus Icon" width={12} height={12} />
        <Link href="/companions/new" >
          <p>Build a New Companion</p>
        </Link>      
      </button>
    </section>
  )
}

export default CTA