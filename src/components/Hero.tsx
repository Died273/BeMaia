export default function Hero() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 py-16 md:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-6 md:mb-10 text-foreground">
          Make Wellbeing<br />Your Advantage
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-8 md:mb-12 max-w-3xl px-4">
          Future-proof your business by creating a thriving work environment.
        </p>
        <button 
          onClick={() => window.open('https://calendly.com/l-boeker-bemaia/30min', '_blank')}
          className="bg-[#5EAB8C] text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-lg font-medium hover:bg-[#4D9474] transition-colors text-base sm:text-lg cursor-pointer"
        >
          Book a demo
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-16 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="bg-white border-[3px] border-black rounded-2xl p-8 sm:p-12 md:p-16 flex-1 text-center relative overflow-hidden flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#5EAB8C] rounded-t-xl"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Analyze</h2>
        </div>

        <div className="bg-white border-[3px] border-black rounded-2xl p-8 sm:p-12 md:p-16 flex-1 text-center relative overflow-hidden flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#7DB5D8] rounded-t-xl"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Advise</h2>
        </div>

        <div className="bg-white border-[3px] border-black rounded-2xl p-8 sm:p-12 md:p-16 flex-1 text-center relative overflow-hidden flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#E8B67A] rounded-t-xl"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Adapt</h2>
        </div>
      </section>
    </div>
  );
}