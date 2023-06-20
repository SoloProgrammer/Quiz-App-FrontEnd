import React from 'react'
import AppLogo from '../AppLogo/AppLogo'

const Hero = () => {
    return (
        <section className="HeroSection bg-white mt-4 f-roboto p-4 mx-2 lg:mx-10 rounded-md">
            <div className="header">
                <AppLogo iconW={6} textColor={"white"} textSizeDesk={"xl"} textSizeMob={"lg"} />
            </div>
            <div className="overview_section flex items-center justify-around flex-col-reverse lg:flex-row">
                <div className="leftSide flex flex-col items-start">
                    <h1 className='text-2xl lg:text-4xl text-blue-600 my-3 text-left'>TechQuiz: Test your tech skills now!</h1>
                    <p className='my-4 lg:text-lg text-gray-600 text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur facere explicabo earum <br />soluta eos totam ipsum sint delectus nostrum rerum, aperiam laborum exercitationem.</p>
                    <button className='mt-10 px-6 py-2 bg-indigo-500 rounded-full text-white md:text-lg lg:text-2xl transition-all hover:scale-105'>
                        <a className='text-white' href="#exploreQuizes">
                            Explore Quizes
                        </a>
                    </button>
                </div>
                <div className="right mb-6 mt-4 lg:mb-0 lg:mt-0 ">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-quiz-8304777-6665988.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default Hero
