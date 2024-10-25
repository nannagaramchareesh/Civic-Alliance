import React from 'react';
import Marquee from "react-fast-marquee";
export default function Collab() {
    return (
        <div>
            <section className="">
                <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
                    <div className="text-gray-500 dark:text-gray-400 overflow-hidden"> {/* Add overflow-hidden here */}
                        <Marquee speed={100} style={{ overflow: 'hidden' }}> {/* You can also set overflow hidden here */}
                            <div className='mr-32 group cursor-pointer'>
                                <h1 className='text-gray-400 text-3xl font-bold text-center group-hover:text-white'>Ministry</h1>
                                <h1 className='text-gray-400 text-3xl font-bold text-center group-hover:text-white'>Of Gas</h1>
                            </div>

                            <div className='mr-32 group cursor-pointer'>
                                <h1 className='text-gray-400 text-3xl text-center font-bold group-hover:text-white'>Ministry</h1>
                                <h1 className='text-gray-400 text-3xl font-bold text-center group-hover:text-white'>Of Roads</h1>
                            </div>
                            <div className='mr-32 group cursor-pointer'>
                                <h1 className='text-gray-400 text-3xl text-center font-bold group-hover:text-white'>Ministry</h1>
                                <h1 className='text-gray-400 text-3xl font-bold text-center group-hover:text-white'>Of Health</h1>
                            </div>
                            <div className='mr-32 group cursor-pointer'>
                                <h1 className='text-gray-400 text-3xl text-center font-bold group-hover:text-white'>Ministry</h1>
                                <h1 className='text-gray-400 text-3xl font-bold text-center group-hover:text-white'>Of Defence</h1>
                            </div>
                            <div className='mr-32 group cursor-pointer'>
                                <h1 className='text-gray-400 text-3xl text-center font-bold group-hover:text-white'>Ministry</h1>
                                <h1 className='text-gray-400 text-3xl font-bold text-center group-hover:text-white'>Of Finance</h1>
                            </div>
                        </Marquee>
                    </div>
                </div>
            </section>
        </div>
    )
}
