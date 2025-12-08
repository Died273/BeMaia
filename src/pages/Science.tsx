import React from "react";
import { Link } from "react-router-dom";

export const OurApproach = (): JSX.Element => {
  const letters = [
    { letter: "T", left: "207px" },
    { letter: "H", left: "476px", width: "112.33%", leftOffset: "-6.85%" },
    { letter: "R", left: "745px", width: "98.63%", leftOffset: "0" },
    { letter: "I", left: "1014px", width: "42.47%", leftOffset: "28.77%" },
    { letter: "V", left: "1283px", width: "109.59%", leftOffset: "-5.48%" },
    { letter: "E", left: "1552px", width: "91.78%", leftOffset: "4.11%" },
  ];

  return (
    <div
      className="bg-[#fff0db] w-full min-w-[1920px] min-h-[5550px] relative"
      data-model-id="98:77"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-[1920px] h-[90px]">
        <div className="absolute w-full h-full top-0 left-0 bg-[#fff8ef]">
          <nav
            className="relative w-[45.99%] h-[66.67%] top-[16.67%] left-[10.78%]"
            aria-label="Main navigation"
          >
            <div className="absolute w-[11.55%] h-[58.33%] top-[21.67%] left-[23.90%] flex items-center justify-center [font-family:'KitSans-Regular',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-[normal]">
              <Link
                to="#"
                className="flex items-center justify-center w-full h-full"
              >
                About us
              </Link>
            </div>

            <div className="absolute w-[18.35%] h-full top-0 left-0 flex">
              <Link
                to="/"
                className="flex items-end justify-center flex-1 w-[162px] [font-family:'KitSans-Regular',Helvetica] font-normal text-black text-5xl text-center tracking-[0] leading-[normal]"
                aria-label="Home"
              >
                LOGO
              </Link>
            </div>

            <div className="absolute w-[14.04%] h-[48.33%] top-[26.67%] left-[42.58%] flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-[normal]">
              <Link
                to="#"
                className="flex items-center justify-center w-full h-full"
              >
                Dashboard
              </Link>
            </div>

            <Link
              className="absolute w-[17.89%] h-[48.33%] top-[26.67%] left-[63.76%] flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-[normal]"
              to="/our-approach"
              aria-current="page"
            >
              Our Approach
            </Link>

            <div className="absolute w-[10.31%] h-[48.33%] top-[26.67%] left-[88.79%] flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-[normal]">
              <Link
                to="#"
                className="flex items-center justify-center w-full h-full"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>

        <button
          className="flex w-[9.32%] h-[63.33%] items-center justify-center gap-2.5 px-20 py-[15px] absolute top-[18.89%] left-[79.90%] bg-[#51a578] rounded-[15px]"
          type="button"
          aria-label="Book a demo"
        >
          <span className="relative flex items-center justify-center w-fit ml-[-53.00px] mr-[-53.00px] [font-family:'Inter',Helvetica] font-semibold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Book a demo
          </span>
        </button>
      </header>

      {/* Main Content */}
      <p className="absolute top-[345px] left-[591px] w-[738px] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-[34px]">
        Based on academically validated frameworks our approach divides
        well-being into 6 dimensions.
      </p>

      <h1 className="absolute top-[453px] left-[469px] w-[970px] h-[110px] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[110px] text-center tracking-[0] leading-[110px]">
        BeMaia Approach
      </h1>

      {/* THRIVE Letters */}
      {letters.map((item, index) => (
        <div
          key={index}
          className="flex w-[162px] h-[158px] items-center justify-center gap-2.5 px-[30px] py-2.5 absolute top-[903px] bg-[#88c0e5] rounded-[15px] border-0 border-none shadow-[0px_2px_2px_#00000040]"
          style={{ left: item.left }}
        >
          <div className="relative w-[73px] h-[110px]">
            <div
              className="absolute h-full top-0 flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-white text-[110px] text-center tracking-[0] leading-[110px] whitespace-nowrap"
              style={{
                width: item.width || "100%",
                left: item.leftOffset || "0",
              }}
            >
              {item.letter}
            </div>
          </div>
        </div>
      ))}

      {/* Trust & Connection Section */}
      <section className="absolute top-[1112px] left-[207px] w-[1506px] h-[335px] bg-[#fddcae] rounded-[15px] border border-solid border-black">
        <h2 className="absolute w-[39.51%] h-[32.84%] top-0 left-[4.45%] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[64px] tracking-[0] leading-[110px] whitespace-nowrap">
          Trust &amp; Connection
        </h2>

        <img
          className="absolute w-[96.10%] h-0 top-[32.69%] left-[2.08%] object-cover"
          alt=""
          src="https://c.animaapp.com/kZyuwGKQ/img/vector-1-4.svg"
          role="presentation"
        />

        <div className="absolute w-[96.10%] h-[48.66%] top-[45.37%] left-[2.12%] bg-[#fff8ef] rounded-[15px]" />

        <p className="absolute w-[88.53%] h-[20.30%] top-[54.33%] left-[5.68%] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-justify tracking-[0] leading-[34px]">
          Measures the quality of relationships in your workplace, including
          inclusion, belonging, management support, and psychological safety
          within teams.
        </p>
      </section>

      {/* Health & Safety Section */}
      <section
        className="absolute top-[1474px] left-[207px] w-[1506px] h-[335px] bg-[#fddcae] rounded-[15px] border border-solid border-black"
        aria-labelledby="health-safety-heading"
      >
        <h2
          id="health-safety-heading"
          className="absolute w-[31.74%] h-[32.84%] top-0 left-[4.45%] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[64px] tracking-[0] leading-[110px] whitespace-nowrap"
        >
          Health &amp; Safety
        </h2>

        <img
          className="absolute w-[96.10%] h-0 top-[32.69%] left-[2.08%] object-cover"
          alt=""
          src="https://c.animaapp.com/kZyuwGKQ/img/vector-1-4.svg"
          role="presentation"
        />

        <div className="absolute w-[96.10%] h-[48.66%] top-[40.30%] left-[2.12%] bg-[#fff8ef] rounded-[15px]" />

        <p className="absolute w-[88.53%] h-[20.30%] top-[49.25%] left-[5.68%] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-justify tracking-[0] leading-[34px]">
          Covers physical safety, manageable workload, stress management, and the
          prevention of burnout-inducing conditions.
        </p>
      </section>

      {/* Rewards & Security Section */}
      <section
        className="absolute top-[1836px] left-[207px] w-[1506px] h-[335px] bg-[#fddcae] rounded-[15px] border border-solid border-black"
        aria-labelledby="rewards-security-heading"
      >
        <h2
          id="rewards-security-heading"
          className="absolute w-[39.97%] h-[32.84%] top-0 left-[4.45%] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[64px] tracking-[0] leading-[110px] whitespace-nowrap"
        >
          Rewards &amp; Security
        </h2>

        <img
          className="absolute w-[96.10%] h-0 top-[32.69%] left-[2.08%] object-cover"
          alt=""
          src="https://c.animaapp.com/kZyuwGKQ/img/vector-1-4.svg"
          role="presentation"
        />

        <div className="absolute w-[96.10%] h-[48.66%] top-[40.30%] left-[2.12%] bg-[#fff8ef] rounded-[15px]" />

        <p className="absolute w-[88.53%] h-[10.15%] top-[49.25%] left-[5.68%] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-justify tracking-[0] leading-[34px]">
          Focuses on fair compensation, benefits, job security, and the feeling
          that work is a stable foundation for life.
        </p>
      </section>

      {/* Independence & Flexibility Section */}
      <section
        className="absolute top-[2198px] left-[207px] w-[1506px] h-[335px] bg-[#fddcae] rounded-[15px] border border-solid border-black"
        aria-labelledby="independence-flexibility-heading"
      >
        <h2
          id="independence-flexibility-heading"
          className="absolute w-[54.05%] h-[32.84%] top-0 left-[4.45%] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[64px] tracking-[0] leading-[110px] whitespace-nowrap"
        >
          Independence &amp; Flexibility
        </h2>

        <img
          className="absolute w-[96.10%] h-0 top-[32.69%] left-[2.08%] object-cover"
          alt=""
          src="https://c.animaapp.com/kZyuwGKQ/img/vector-1-4.svg"
          role="presentation"
        />

        <div className="absolute w-[96.10%] h-[48.66%] top-[40.30%] left-[2.12%] bg-[#fff8ef] rounded-[15px]" />

        <p className="absolute w-[88.53%] h-[30.45%] top-[49.25%] left-[5.68%] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-justify tracking-[0] leading-[34px]">
          Addresses autonomy, employee voice, control over work methods, and
          operational design that respects individual agency.
        </p>
      </section>

      {/* Variety & Purpose Section */}
      <section className="absolute top-[2560px] left-[207px] w-[1506px] h-[335px] bg-[#fddcae] rounded-[15px] border border-solid border-black">
        <h2 className="absolute w-[36.72%] h-[32.84%] top-0 left-[4.45%] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[64px] tracking-[0] leading-[110px] whitespace-nowrap">
          Variety &amp; Purpose
        </h2>

        <img
          className="absolute w-[96.10%] h-0 top-[32.69%] left-[2.08%] object-cover"
          alt=""
          src="https://c.animaapp.com/kZyuwGKQ/img/vector-1-4.svg"
          role="presentation"
        />

        <div className="absolute w-[96.10%] h-[48.66%] top-[40.30%] left-[2.12%] bg-[#fff8ef] rounded-[15px]" />

        <p className="absolute w-[88.53%] h-[30.45%] top-[49.25%] left-[5.68%] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-justify tracking-[0] leading-[34px]">
          Includes the meaningfulness of tasks, opportunities for achievement,
          appreciation, and the ability to see how work contributes to something
          larger.
        </p>
      </section>

      {/* Evolution & Growth Section */}
      <section className="absolute top-[2922px] left-[207px] w-[1506px] h-[335px] bg-[#fddcae] rounded-[15px] border border-solid border-black">
        <h2 className="absolute w-[39.24%] h-[32.84%] top-0 left-[4.45%] flex items-center justify-center [font-family:'Inter',Helvetica] font-semibold text-black text-[64px] tracking-[0] leading-[110px] whitespace-nowrap">
          Evolution &amp; Growth
        </h2>

        <img
          className="absolute w-[96.10%] h-0 top-[32.69%] left-[2.08%] object-cover"
          alt=""
          src="https://c.animaapp.com/kZyuwGKQ/img/vector-1-4.svg"
          role="presentation"
        />

        <div className="absolute w-[96.10%] h-[48.66%] top-[40.30%] left-[2.12%] bg-[#fff8ef] rounded-[15px]" />

        <p className="absolute w-[88.53%] h-[20.30%] top-[49.25%] left-[5.68%] [font-family:'Inter',Helvetica] font-medium text-black text-2xl text-justify tracking-[0] leading-[34px]">
          Covers learning opportunities, skill development, career progression,
          and the sense that one&#39;s capabilities are expanding.
        </p>
      </section>
    </div>
  );
};
