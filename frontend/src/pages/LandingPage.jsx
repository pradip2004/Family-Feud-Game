import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate(); // Moved inside the component

  return (
    <div className='w-full h-screen bg-amber-100 overflow-hidden'>
      <div className="header h-[10%] flex items-center justify-between px-3">
        <img src="/gdg1.png" alt="GDG Logo" className='w-52'/>
        <img src="/techX.png" alt="TechX Logo" className='w-52'/>
      </div>
      <div className="w-full h-[90%] relative">
        <img src="/Logo.png" alt="Main Logo" className='absolute w-[40rem] left-1/2 -translate-x-1/2'/>
        <img src="/grpA.png" alt="Group A" className='absolute w-96 bottom-0 left-0'/>
        <img src="/grpB.png" alt="Group B" className='absolute w-96 bottom-0 right-0'/>
        <button 
          className='px-5 py-3 bg-amber-800 text-amber-100 font-bold rounded-full shadow-xl border-2 border-black absolute top-[80%] left-1/2 -translate-x-1/2'
          onClick={() => navigate('/live')}
        >
          Live
        </button>
        <button 
          className='px-5 py-3 bg-amber-800 text-amber-100 font-bold rounded-full shadow-xl border-2 border-black absolute top-[80%] -translate-x-1/2 left-[60%]'
          onClick={() => navigate('/admin')}
        >
          Admin
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
