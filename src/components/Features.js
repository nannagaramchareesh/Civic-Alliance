import React from 'react'
import './another.css';
import sideimage from '../images/new-project.svg'
import sideimage1 from '../images/search.svg'
import sideimage2 from '../images/video-conference.svg'
import {Link} from 'react-router-dom'
import addofficer from '../images/addofficer.svg'
import sideimage4 from '../images/collaborationimage.webp'
export default function Features() {
    return (
        <div id='features' className=''>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12 ml-16 md:p-10 mt-12">
            <Link to="/AddProject"
                    className="flex  backdrop-filter hover:bg-gray-50 hover:bg-opacity-10 flex-col p-6 space-y-6  rounded-[40px] shadow lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 card animated-card" id="discussionCard">
                    <div
                        className="flex items-center justify-center w-16 h-16  rounded-full shadow-inner lg:h-20 lg:w-20">
                        {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg> */}
                        <img src={sideimage} alt=""/>
                    </div>
                    <div className="flex-1">
                        <h5 className="mb-3 text-xl font-bold lg:text-2xl text-white">Add Project</h5>
                        <p className="mb-6 text-lg text-slate-400">
                        Add new projects, assign tasks, and manage interdepartmental collaboration efficiently.</p>
                        <div className="animated-arrow">
                            <span className="the-arrow -left">
                                <span className="shaft"></span>
                            </span>
                            <span className="main">
                                <span className="text-indigo-600">Explore More </span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>

                                <span className="the-arrow -right">
                                    <span className="shaft"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
                <Link to="/viewprojects"
                    className="flex  backdrop-filter hover:bg-gray-50 hover:bg-opacity-10 flex-col p-6 space-y-6  rounded-[40px] shadow lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 card animated-card" id="discussionCard">
                    <div
                        className="flex items-center justify-center w-16 h-16  rounded-full shadow-inner lg:h-20 lg:w-20">
                        {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg> */}
                        <img src={sideimage1} alt=""/>
                        
                    </div>
                    <div className="flex-1">
                        <h5 className="mb-3 text-xl font-bold lg:text-2xl text-white">View Project</h5>
                        <p className="mb-6 text-lg text-slate-400">View project details, progress, timelines, resources, updates, and collaboration status.</p>
                        <div className="animated-arrow">
                            <span className="the-arrow -left">
                                <span className="shaft"></span>
                            </span>
                            <span className="main">
                                <span className="text-indigo-600">Explore More </span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>

                                <span className="the-arrow -right">
                                    <span className="shaft"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
                <Link to="/addofficer"
                    className="flex  backdrop-filter hover:bg-gray-50 hover:bg-opacity-10 flex-col p-6 space-y-6  rounded-[40px] shadow lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 card animated-card" id="discussionCard">
                    <div
                        className="flex items-center justify-center w-16 h-16  rounded-full shadow-inner lg:h-20 lg:w-20">
                        {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg> */}
                        <img src={addofficer} alt=""/>
                        
                    </div>
                    <div className="flex-1">
                        <h5 className="mb-3 text-xl font-bold lg:text-2xl text-white">Add Officers</h5>
                        <p className="mb-6 text-lg text-slate-400">Register new officers, assign roles, and send login credentials via email.</p>
                        <div className="animated-arrow">
                            <span className="the-arrow -left">
                                <span className="shaft"></span>
                            </span>
                            <span className="main">
                                <span className="text-indigo-600">Explore More </span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>

                                <span className="the-arrow -right">
                                    <span className="shaft"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>

                <Link to="/chat"
                    className="flex  backdrop-filter hover:bg-gray-50 hover:bg-opacity-10 flex-col p-6 space-y-6  rounded-[40px] shadow lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 card animated-card" id="discussionCard">
                    <div
                        className="flex items-center justify-center w-16 h-16  rounded-full shadow-inner lg:h-20 lg:w-20">
                        {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg> */}
                        <img src={sideimage2} alt=""/>
                    </div>
                    <div className="flex-1">
                        <h5 className="mb-3 text-xl font-bold lg:text-2xl text-white">Discussion Forum</h5>
                        <p className="mb-6 text-lg text-slate-400">Join discussions, share ideas, collaborate, resolve issues, and exchange insights across departments.</p>
                        <div className="animated-arrow">
                            <span className="the-arrow -left">
                                <span className="shaft"></span>
                            </span>
                            <span className="main">
                                <span className="text-indigo-600">Explore More </span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>

                                <span className="the-arrow -right">
                                    <span className="shaft"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
                <Link to="/collaborationrequests"
                    className="flex  backdrop-filter hover:bg-gray-50 hover:bg-opacity-10 flex-col p-6 space-y-6  rounded-[40px] shadow lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 card animated-card" id="discussionCard">
                    <div
                        className="flex items-center justify-center w-16 h-16  rounded-full shadow-inner lg:h-20 lg:w-20">
                        {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg> */}
                        <img src={sideimage4} className='white' alt=""/>
                    </div>
                    <div className="flex-1">
                        <h5 className="mb-3 text-xl font-bold lg:text-2xl text-white">Alliance Requests</h5>
                        <p className="mb-6 text-lg text-slate-400">Review incoming collaboration invites from other departments, take action, and forge powerful alliances on impactful projects.
                        </p>
                        <div className="animated-arrow">
                            <span className="the-arrow -left">
                                <span className="shaft"></span>
                            </span>
                            <span className="main">
                                <span className="text-indigo-600">Explore More </span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>

                                <span className="the-arrow -right">
                                    <span className="shaft"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
                <Link to="/sentCollaborationRequests"
                    className="flex  backdrop-filter hover:bg-gray-50 hover:bg-opacity-10 flex-col p-6 space-y-6  rounded-[40px] shadow lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 card animated-card" id="discussionCard">
                    <div
                        className="flex items-center justify-center w-16 h-16  rounded-full shadow-inner lg:h-20 lg:w-20">
                        {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg> */}
                        <img src={sideimage2} alt=""/>
                    </div>
                    <div className="flex-1">
                        <h5 className="mb-3 text-xl font-bold lg:text-2xl text-white">Track Sent Requests</h5>
                        <p className="mb-6 text-lg text-slate-400">Track the status of your collaboration requests, stay updated on approvals, and stay connected with your interdepartmental partners.
                        </p>
                        <div className="animated-arrow">
                            <span className="the-arrow -left">
                                <span className="shaft"></span>
                            </span>
                            <span className="main">
                                <span className="text-indigo-600">Explore More </span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>

                                <span className="the-arrow -right">
                                    <span className="shaft"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>



            </div>
        </div>
    )
}
