export default function TeamStory() {
  return (
    <div className="bg-background-light flex flex-col items-center p-8 pb-24" style={{ backgroundColor: '#fff8ef' }}>
      <div className="max-w-5xl w-full">
        {/* Team Photo */}
        <div className="mb-12">
          <img
            src="assets/images/team-photo.jpeg"
            alt="BeMaia founding team"
            className="w-full h-auto rounded-3xl shadow-lg object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        {/* Story Card */}
        <div className="bg-background rounded-3xl p-10 shadow-lg">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                <img
                  src="/assets/images/uva-logo.png"
                  alt="UvA logo"
                  className="w-20 h-20"
                />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-xl text-foreground leading-relaxed">
                BeMaia was founded during the University of Amsterdam Entrepreneurship minor, with the 
                goal of improving people's working lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
