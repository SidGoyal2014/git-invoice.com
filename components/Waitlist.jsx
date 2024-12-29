import React from 'react';

const Waitlist = () => {
  return (
    <div id="waitlist" className="w-full pt-8  min-h-[40vh] flex flex-col justify-center items-center px-4 sm:px-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl pb-4">Waitlist Signup</h1>
        <p className="text-gray-600 mt-2 max-w-[600px] mx-auto">
          We’re working hard to make Git Invoice perfect for you. In the meantime, sign up to know when we launch. Thanks for your patience – we can’t wait to share it with you soon!
        </p>
      </div>
      <iframe
        src="https://tally.so/embed/mVoWkN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="210px"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Waitlist Signup Form"
        className="border-none max-w-[600px] w-full"
      ></iframe>
    </div>
  );
};

export default Waitlist;
