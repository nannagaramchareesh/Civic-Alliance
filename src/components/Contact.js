import React from 'react'
import contact from '../images/contact.svg'
export default function Contact() {
    return (
        <div>
            <section className="body-font pl-52 relative flex justify-center items-center bg-gray-900 text-gray-400">
            <img src={contact} className="w-[300px] h-[300px]"/>

                <div className="container mx-auto px-5 py-24">

                    <div className="mb-12 flex w-full flex-col text-center">
                        <h1 className="title-font  font-bold mb-4 text-4xl text-white sm:text-3xl">Contact Us</h1>
                        <p className="mx-auto text-xl leading-relaxed lg:w-2/3">Feel free to reach out to us! Whether you have a question,
                            feedback, or a collaboration proposal, we'd love to hear from you.
                        </p>
                    </div>

                    <div className="mx-auto md:w-2/3 lg:w-1/2">
                        <div className="-m-2 flex flex-wrap">

                            <div className="w-1/2 p-2">
                                <div className="relative">
                                    <input type="text" id="name" name="name" className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Name" />
                                    <label for="name" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Name</label>
                                </div>
                            </div>
                            <div className="w-1/2 p-2">
                                <div className="relative">
                                    <input type="email" id="email" name="email" className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Email" />
                                    <label for="email" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Email</label>
                                </div>
                            </div>
                            <div className="mt-4 w-full p-2">
                                <div className="relative">
                                    <textarea id="message" name="message" className="peer h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-6 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Message"></textarea>
                                    <label for="message" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Message</label>
                                </div>
                            </div>
                            <div className="w-full p-2">
                                <button className="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none">Button</button>
                            </div>


                            <div className="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
                                <a className="text-indigo-400">vivaswanth143@gmail.com</a>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}
