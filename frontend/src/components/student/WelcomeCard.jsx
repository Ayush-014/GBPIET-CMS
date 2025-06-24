import React from 'react'
import ill2 from "../../assets/images/db_ill2.svg"

function WelcomeCard({ name, branch, batch }) {

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });


  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white rounded-xl pl-4 sm:pl-10 pb-4 pt-4 mb-6 md:-mt-14">
      <div className="w-full sm:w-auto">
        <div className="text-xs sm:text-sm mb-4 sm:mb-10 font-sL">
          {today}
        </div>
        <div className="text-2xl sm:text-4xl mb-1 font-sB">Welcome, {name}.</div>
        <div className="text-xs sm:text-sm font-sL">{branch}, {batch}</div>
      </div>
      <div className="w-32 sm:w-56 flex-shrink-0 mt-4 sm:mt-0 p-0 hidden sm:flex">
        <img src={ill2} alt="Students" className="w-full object-contain" />
      </div>
    </div>
  );
}

export default WelcomeCard
