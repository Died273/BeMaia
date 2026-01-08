export default function MentalHealthSection() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16" 
         style={{ 
           backgroundColor: '#fff8ef',
           paddingLeft: 'clamp(1rem, 5vw, 3rem)',
           paddingRight: 'clamp(1rem, 5vw, 3rem)'
         }}>
      <div className="w-full" style={{ maxWidth: 'clamp(1152px, 90vw, 1600px)' }}>
        {/* Row 1: Title */}
        <div className="text-center md:text-left" style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <h1 className="font-bold text-foreground leading-tight" 
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
              }}>
            Mental health<br />affects us all
          </h1>
        </div>

        {/* Row 2: Description Text + 1 out of 5 Card */}
        <div className="flex flex-col md:flex-row items-center" 
             style={{ 
               gap: 'clamp(0.5rem, 1vw, 0.75rem)',
               marginBottom: 'clamp(2rem, 4vw, 4rem)'
             }}>
          {/* Left: Description Text */}
          <div className="flex-1 flex justify-center md:justify-end order-2 md:order-1 mt-4 md:mt-0 md:max-w-[50%]">
            <p className="text-foreground leading-relaxed text-center md:text-left" 
               style={{ 
                 fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                 maxWidth: 'clamp(20rem, 30vw, 32rem)'
               }}>
              The modern workplace faces a crisis, impacting companies and their employees alike. BeMaia helps organizations adapt for the future.
            </p>
          </div>

          {/* Right: 1 out of 5 Card */}
          <div className="flex justify-center md:justify-end w-full md:w-auto md:flex-1 order-1 md:order-2 md:max-w-[50%]">
            <div className="bg-secondary rounded-3xl flex items-center w-full" 
                 style={{
                   padding: 'clamp(1.5rem, 3vw, 3rem)',
                   gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                   maxWidth: 'clamp(400px, 40vw, 700px)',
                   height: 'clamp(200px, 20vw, 350px)'
                 }}>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <span className="font-bold text-foreground leading-none" 
                      style={{ fontSize: 'clamp(2rem, 5vw, 6rem)' }}>1 out</span>
                <span className="font-bold text-foreground leading-none" 
                      style={{ fontSize: 'clamp(2rem, 5vw, 6rem)' }}>of 5</span>
                <p className="text-foreground font-medium" 
                   style={{ 
                     fontSize: 'clamp(0.875rem, 1.25vw, 1.375rem)',
                     marginTop: 'clamp(0.5rem, 1vw, 1rem)'
                   }}>
                  Employees in the Netherlands<br />are affected by burnout
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden flex-shrink-0" 
                   style={{ 
                     width: 'clamp(8rem, 12vw, 16rem)',
                     height: 'clamp(8rem, 12vw, 16rem)'
                   }}>
                <img 
                  src="/assets/images/mental-health-1.png" 
                  alt="Person experiencing burnout"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: 3.2B Lost Card + Text */}
        <div className="flex flex-col md:flex-row items-center" 
             style={{ 
               gap: 'clamp(0.5rem, 1vw, 0.75rem)',
               marginBottom: 'clamp(2rem, 4vw, 4rem)'
             }}>
          {/* Left: 3.2B Lost Card */}
          <div className="flex justify-center md:justify-start w-full md:w-auto md:flex-1 order-1 md:max-w-[50%]">
            <div className="bg-accent rounded-3xl flex items-center w-full" 
                 style={{
                   padding: 'clamp(1.5rem, 3vw, 3rem)',
                   gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                   maxWidth: 'clamp(400px, 40vw, 700px)',
                   height: 'clamp(200px, 20vw, 350px)'
                 }}>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <span className="font-bold text-foreground leading-none" 
                      style={{ fontSize: 'clamp(2rem, 5vw, 6rem)' }}>€3.2 billion</span>
                <span className="font-bold text-foreground leading-none" 
                      style={{ fontSize: 'clamp(1.75rem, 4.5vw, 5rem)' }}>lost</span>
                <p className="text-foreground font-medium" 
                   style={{ 
                     fontSize: 'clamp(0.875rem, 1.25vw, 1.375rem)',
                     marginTop: 'clamp(0.5rem, 1vw, 1rem)'
                   }}>
                  In revenue in the Netherlands<br />due to absenteeism
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden flex-shrink-0" 
                   style={{ 
                     width: 'clamp(8rem, 12vw, 16rem)',
                     height: 'clamp(8rem, 12vw, 16rem)'
                   }}>
                <img 
                  src="/assets/images/mental-health-2.png" 
                  alt="Out of office sign on chair"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Description Text */}
          <div className="flex-1 flex justify-center md:justify-start order-2 mt-4 md:mt-0 md:max-w-[50%]">
            <p className="text-foreground leading-relaxed text-center md:text-left" 
               style={{ 
                 fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                 maxWidth: 'clamp(20rem, 30vw, 32rem)'
               }}>
              Bridging the gap between managers and their teams makes them more resilient. Creating an environment where both can thrive together.
            </p>
          </div>
        </div>

        {/* Row 4: Text + 83% Card */}
        <div className="flex flex-col md:flex-row items-center" 
             style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
          {/* Left: Description Text */}
          <div className="flex-1 flex justify-center md:justify-end order-2 md:order-1 mt-4 md:mt-0 md:max-w-[50%]">
            <p className="text-foreground leading-relaxed text-center md:text-left" 
               style={{ 
                 fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                 maxWidth: 'clamp(20rem, 30vw, 32rem)'
               }}>
              Organizations that adapt to their employees' needs are more competitive. Ensuring the future of companies by attracting talent.
            </p>
          </div>

          {/* Right: 83% Card */}
          <div className="flex justify-center md:justify-end w-full md:w-auto md:flex-1 order-1 md:order-2 md:max-w-[50%]">
            <div className="bg-primary rounded-3xl flex items-center w-full" 
                 style={{
                   padding: 'clamp(1.5rem, 3vw, 3rem)',
                   gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                   maxWidth: 'clamp(400px, 40vw, 700px)',
                   height: 'clamp(200px, 20vw, 350px)'
                 }}>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <span className="font-bold text-foreground leading-none" 
                      style={{ fontSize: 'clamp(2rem, 5vw, 6rem)' }}>83%</span>
                <p className="text-foreground font-medium" 
                   style={{ 
                     fontSize: 'clamp(0.875rem, 1.25vw, 1.375rem)',
                     marginTop: 'clamp(0.5rem, 1vw, 1rem)'
                   }}>
                  Of Gen Z employees are<br />impacted by burnout
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden flex-shrink-0" 
                   style={{ 
                     width: 'clamp(8rem, 12vw, 16rem)',
                     height: 'clamp(8rem, 12vw, 16rem)'
                   }}>
                <img 
                  src="/assets/images/mental-health-3.png" 
                  alt="Team in a meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}