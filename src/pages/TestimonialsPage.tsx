import { Quote } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TestimonialsPage = () => {
  // Combined CLIENT + CANDIDATE testimonials, with client ones first
  const testimonials = [
    // CLIENT TESTIMONIALS
    {
      fullQuote: `IPC Systems and Ban Partners have been partners for over 15 years. Melinda and her team have been extremely helpful in providing Technical Project Managers and Field Engineers. Most recently, Melinda provided a contract-PM for us that we eventually hired as a direct employee and has been excelling in his work. Melinda is always responsive and thoughtful in her approach and can be counted upon to deliver highly qualified candidates at a reasonable market rate. I highly recommend Ban Partners, without any reservation.`,
      author: 'Tim Richards',
      position: 'VP Communications Operations, Americas',
      company: 'IPC Systems',
      avatarUrl: '/images/latin.jpg'
    },
    {
      fullQuote: `Working with Melinda for our website development project was the right choice. She was instrumental in researching and identifying the right development company to meet our needs, ensuring that every detail aligned with our objectives. Melinda expertly managed the relationship between our team and the developers, advocating for our requirements and making sure our expectations were met at every stage. Her regular collaboration and communication were outstanding, keeping everything on track while proactively addressing any challenges that arose. She handled issues seamlessly, allowing me to focus on other tasks with confidence. Melinda's professionalism, attention to detail, and commitment to our success made the entire process smooth and stress-free. I would highly recommend working with Melinda and Ban Partners to any business seeking expert guidance and strategic support.`,
      author: 'Jeff Merrick',
      position: 'CIO and VP Digital Information',
      company: '',
      avatarUrl: '/images/office-view.jpg'
    },
    {
      fullQuote: `It is with great pleasure and without hesitation that I recommend Melinda Ban, Director of Business Development at Ban Partners. I have had the privilege of working with Melinda and Ban Partners for over 13 years in my capacity at first CDS and then the TMX Group Inc. During this time, she has consistently demonstrated exceptional professionalism, expertise, and dedication. Melinda's contributions to our recruitment efforts have been invaluable. She deeply understands the talent market and consistently delivers high-quality candidate submissions that align with our specific needs. The caliber of candidates presented by Ban Partners has consistently exceeded our expectations, resulting in successful placements and long-term value for TMX. One of Melinda's most notable strengths is her responsiveness and proactive approach! Any questions or concerns that arose throughout the recruitment process were addressed promptly and thoroughly. She is a consummate professional, demonstrating excellent communication skills and a genuine commitment to ensuring a smooth and successful experience. Her ability to navigate complex situations and provide insightful solutions is truly commendable. Furthermore, Melinda's support of TMX over the past 13+ years speaks volumes about her dedication and commitment to building strong, long-lasting partnerships. She has consistently demonstrated a deep understanding of our company culture and requirements, making her a trusted and reliable partner. In summary, my experience with Melinda has been overwhelmingly positive! Her professionalism, expertise, and dedication to client satisfaction make her an exceptional Director of Business Development.`,
      author: 'Mark Graham',
      position: 'Senior Talent Acquisition Partner',
      company: 'TMX Group',
      avatarUrl: '/images/office-view2.jpg'
    },
    {
      fullQuote: `I've had a wonderful experience working with Melinda, especially in the context of the staffing solutions her firm has provided. She is always quick to respond and thoroughly addresses any questions or concerns that arise. Her expertise in staffing and her dedication have been instrumental in supporting TMX over the years. I truly appreciate her ability to match the right talent with the right opportunities, and her commitment to delivering exceptional service. It's been a pleasure working with her, and I'm confident her new venture will thrive.`,
      author: 'Sowita Hashimi',
      position: 'Manager Talent Management',
      company: 'TMX Group',
      avatarUrl: '/images/office-view3.jpg'
    },
    {
      fullQuote: `Working with Melinda was an absolute game-changer for my job search! From the very first conversation, I felt supported and valued. Melinda took the time to truly understand my skills, goals, and career aspirations. She matched me with an opportunity that was perfectly aligned with my experience, and I never felt like I was being pushed into something that was not right for me. What really stood out was her personalized approach — she did not just send me generic job listings; she provided tailored advice and guided me through each step of the process. Melinda kept me updated regularly, offering constructive feedback after interviews and helped me navigate each step with confidence. She was proactive, responsive, and genuinely cared about my success. Thanks to her expertise, I secured a role that I'm excited about and that aligns perfectly with my long-term goals. If you're on the job hunt, I highly recommend working with Melinda — she made the whole process smoother, less stressful, and ultimately more successful!`,
      author: 'Jared Drepaul',
      position: 'Director HR Operations Technology',
      company: 'TMX Group',
      avatarUrl: '/images/office-view5.jpg'
    },
    {
      fullQuote: `Melinda played a key role in helping me secure a Senior Project Manager position with a U.S. company. From our very first conversation, it was clear that she had the best intentions in bringing me on board and ensuring my skill set aligned with the company's needs for success in this role. Her guidance and support throughout the screening and interview process were invaluable, and I can confidently say I wouldn't have succeeded without her. I highly recommend working with Melinda and building a professional relationship with her to elevate your career.`,
      author: 'Gabriela Alcina',
      position: 'Global Project Manager',
      company: 'IPC Systems',
      avatarUrl: '/images/office-view6.jpg'
    },
    {
      fullQuote: `From start to finish, my customer relationship experience with you has been excellent. I have always felt heard and continue to have full faith in you representing my interests at the bargaining table with the client. Your experience in the job market is evident as is your pulse on it. Your responses have always been direct and timely, and any questions or concerns were addressed with clarity and professionalism. Throughout our interactions, I have always felt treated fairly and with respect, which has made the entire process smooth and positive.`,
      author: 'Adelle DSilva',
      position: 'Senior Project Manager',
      company: 'DECIEM/The Abnormal Beauty Company',
      avatarUrl: '/images/office-view7.jpg'
    },
    {
      fullQuote: `I worked with Ban Partners on an extended contract. Melinda was instrumental in getting me the position which was well paid and very much suited to my skills. She advocated on my behalf on several extensions resulting in a contract length of over three years. She was always there to answer any questions and went to significant lengths on my behalf. I thank her very much for one of the best positions I ever held.`,
      author: 'Werner Strijewski',
      position: 'Principal Software Engineer',
      company: 'Yamaha Motor Canada',
      avatarUrl: '/images/lightbulb.jpg'
    },
    {
      fullQuote: `I've had the pleasure of working with Melinda over the past four years as a Senior Project Manager at Deciem, and her support has been nothing short of transformative. Her clear communication, responsiveness, and unwavering commitment to ensuring timely payments and seamless contract extensions have made working on contract smooth and successful. Melinda's proactive approach in addressing any questions or concerns, combined with her dedication to building a truly supportive professional relationship, makes her an exceptional partner for anyone in the tech industry. I wholeheartedly recommend working with her—you won't be disappointed.`,
      author: 'Shayan Nedaei',
      position: 'Senior Project Manager Digital Transformation',
      company: 'DECIEM/The Abnormal Beauty Company',
      avatarUrl: '/images/office-view4.png'
    },
    {
      fullQuote: `Having been in the Banking/Finance/Fintech sector for some 15+ years now, and in contract roles for more than 10 of those years, I have dealt with many recruitment firms and spoken with various senior recruiters both in Canada and the US over the years. Melinda contacted me last year with an opportunity that she felt suited my qualifications, experience and career path, towards the end of my previous 3 year contract engagement. A number of conversations later, a few interviews and the required background checks and I started at my current firm at this new role that ended up being an exciting and a challenging commitment. I have now been working with this firm for nearly 6 months now and looking to continue my relationship with BanPartners into the years to come. What stood out for me throughout the process was open channels of communication, full transparency, honest feedback, and being kept in the loop with updates while waiting for client responses. Now that I'm active with this roles, i have seen the day to day business of being a part of the roster of contractors, so the billing/invoicing process, communications, futures planning, etc. have all been very efficient, effective and precise. This level of professionalism is very difficult to come across at least in the technology consulting sector, I am thankful to have had this opportunity and experience.`,
      author: 'Ali Darbani',
      position: 'Senior Project Manager',
      company: 'RBC Capital Markets',
      avatarUrl: '/images/augmented.jpg'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content section with white brick background */}
      <main className="flex-grow pt-12 pb-16 white-brick-bg relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading & descriptive text placed below the navbar */}
          <div className="text-center mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-voltify-500">What Clients Say</h1>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              We place huge value on strong relationships and have seen the benefit they bring to our business. 
              Customer feedback is vital in helping us to get it right.
            </p>
          </div>
          
          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Card content with avatar at top */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="mb-6">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.author} 
                      className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border-4 border-white shadow-md" 
                    />
                  </div>
                  
                  {/* Quote marks */}
                  <div className="mb-4 text-voltify-400">
                    <Quote className="h-8 w-8 mx-auto" />
                  </div>
                  
                  {/* Testimonial text */}
                  <div className="max-h-64 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <p className="text-gray-600 italic">
                      {testimonial.fullQuote}
                    </p>
                  </div>

                  {/* Author info */}
                  <div className="mt-auto">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.position}
                      {testimonial.company ? `, ${testimonial.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="mt-16 text-center">
            <a 
              href="/contact" 
              className="inline-block bg-voltify-500 hover:bg-voltify-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
