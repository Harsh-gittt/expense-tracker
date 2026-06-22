import React from 'react'

const HeroPage1 = () => {
  return (
    <div className="flex flex-1">

      {/* Left — content */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-12 bg-white">

        <span className='inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-6 ring-1 ring-emerald-100'>
          <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full'></span>
          Smart Finance Management
        </span>

        <h1 className='text-5xl font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight'>
          Take Control of<br />
          <span className='text-emerald-500'>Your Money</span>
        </h1>

        <p className='text-gray-500 text-base leading-relaxed mb-8 max-w-md'>
          Monitor spending, set smart budgets, and reach your financial goals — all in one place. Built for people who want clarity, not complexity.
        </p>

        <div className='flex gap-3 mb-12'>
          <button className='bg-gray-900 text-white rounded-xl px-7 py-3.5 font-semibold text-sm transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-100 active:scale-95'>
            Get Started Free
          </button>
          <button className='border border-gray-200 text-gray-600 rounded-xl px-7 py-3.5 font-semibold text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900 active:scale-95'>
            See How It Works →
          </button>
        </div>

        {/* Stats */}
        <div className='flex gap-10 pt-8 border-t border-gray-100'>
          <div>
            <p className='text-2xl font-bold text-gray-900'>10k+</p>
            <p className='text-gray-400 text-xs mt-0.5 font-medium uppercase tracking-wide'>Active Users</p>
          </div>
          <div className='border-l border-gray-100 pl-10'>
            <p className='text-2xl font-bold text-gray-900'>$2M+</p>
            <p className='text-gray-400 text-xs mt-0.5 font-medium uppercase tracking-wide'>Tracked Monthly</p>
          </div>
          <div className='border-l border-gray-100 pl-10'>
            <p className='text-2xl font-bold text-gray-900'>4.9 ★</p>
            <p className='text-gray-400 text-xs mt-0.5 font-medium uppercase tracking-wide'>User Rating</p>
          </div>
        </div>
      </div>

      {/* Right — image */}
      <div className='w-1/2 relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center p-12 overflow-hidden'>

        {/* Decorative blobs */}
        <div className='absolute top-8 right-8 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-2xl'></div>
        <div className='absolute bottom-12 left-8 w-32 h-32 bg-amber-300 rounded-full opacity-25 blur-2xl'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl'></div>

        <img
          className='relative z-10 w-full h-full object-contain drop-shadow-2xl rounded-2xl'
          src="https://images.unsplash.com/vector-1747845727587-7f2ae5d8fa95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzc2luZXNzfGVufDB8fDB8fHww"
          alt="Expense Tracking Illustration"
        />
      </div>

    </div>
  )
}

export default HeroPage1