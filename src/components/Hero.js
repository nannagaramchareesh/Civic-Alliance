import React from 'react'
import Collab from './Collab'
import sideimage from '../images/sideimage.svg'
import Features from './Features'
import StatsImpactSection from './StatsImpactSection.js'

export default function Hero() {
  return (
    <div>
      <section className="">

        <div className="flex items-center justify-center max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 ">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none  md:text-5xl xl:text-6xl dark:text-white text-gradient tracking-wider">Streamlining <br/>Urban Governance </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Empowering interdepartmental collaboration through a digital platform that enhances resource sharing, project coordination, and communication for efficient urban development.</p>
                <div className="w-[30%] absolute bottom-48 h-[50%] blue__gradient"/>
                <div className=""/>
                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <a href="/" className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      Get Started
                    </a>
                </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex ml-20">
                <img src={sideimage} alt=""/>
                <div className="w-[30%] absolute bottom-48 h-[50%] blue__gradient"/>
            </div>                
        </div>
    </section>

    <Collab/>
    {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/> */}

    <Features/>
    {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/> */}

    <StatsImpactSection/>
    {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/> */}


    </div>
  )
}
