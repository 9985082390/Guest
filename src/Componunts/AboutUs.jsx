import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#c9d5ff] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
          About Get Cabin Space
        </h1>
        <p className="text-xs sm:text-base text-center md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
          Welcome to Get Cabin Space, your premier destination for booking meeting rooms. 
          Whether you're attending or conducting meetings, our platform offers a seamless 
          experience to find and reserve the perfect cabin space. Built with React and Tailwind CSS, 
          our application ensures intuitive navigation and responsive design across devices. 
          Enjoy real-time availability updates, calendar integration, and secure user authentication 
          for streamlined booking management. Join us in enhancing your meeting experiences 
          with efficiency and convenience. Get Cabin Space—where every meeting finds its room.
        </p>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Key Features and Benefits
          </h2>
          <ul className="list-disc list-inside text-xs sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>Seamless Booking Process: Experience a user-friendly interface that allows you to quickly find and reserve available meeting rooms tailored to your needs.</li>
            <li>Real-Time Availability: Stay updated with real-time availability status, ensuring you never miss out on booking your preferred cabin space.</li>
            <li>Flexible Scheduling: Easily schedule meetings at your convenience, with options to set dates, times, and recurring bookings effortlessly.</li>
            <li>Calendar Integration: Integrate seamlessly with your preferred calendar app to synchronize bookings and manage your schedule efficiently.</li>
            <li>Secure Authentication: Ensure your data and booking details are protected with secure user authentication, providing peace of mind for every transaction.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Amenities and Specifications
          </h2>
          <ul className="list-disc list-inside text-xs sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>Variety of Room Sizes: Choose from a range of cabin sizes suitable for small group discussions to large-scale presentations.</li>
            <li>High-Speed Internet: Enjoy reliable connectivity with high-speed internet access available in all meeting rooms.</li>
            <li>Audio-Visual Equipment: Access state-of-the-art audio-visual equipment for seamless presentations and video conferencing.</li>
            <li>Refreshment Options: Select rooms equipped with catering options or nearby refreshment facilities for added convenience during meetings.</li>
            <li>Accessible Locations: Conveniently located facilities in key business districts, ensuring accessibility and minimizing travel time for participants.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Our Commitment
          </h2>
          <p className="text-xs sm:text-base text-center md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            At Get Cabin Space, we are committed to providing exceptional service and support to meet your meeting room requirements. 
            Our platform leverages cutting-edge technology and user-centric design to ensure a smooth and efficient booking process. 
            Whether you're a startup, a growing business, or an established enterprise, we aim to enhance your meeting experiences 
            with our flexible and reliable solutions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Contact Us
          </h2>
          <p className="text-xs sm:text-base text-center md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            Have questions or need assistance? Feel free to reach out to our dedicated support team for personalized assistance and guidance. 
            We're here to help you make the most of your meeting space bookings and ensure your business operations run smoothly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Join Us Today
          </h2>
          <p className="text-xs sm:text-base text-center md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            Experience the convenience and efficiency of Get Cabin Space. 
            Join us today and discover how our platform can elevate your meeting room booking experience to the next level. 
            Start booking your ideal meeting space and focus on what matters most—productive and successful meetings.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
