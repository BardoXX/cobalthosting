import React from 'react';
import { useConfig } from '../context/ConfigContext';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    content: 'Switching to Cobalt Hosting was the best decision we made. Our website loads twice as fast now!',
    avatar: '👩‍💼',
  },
  {
    name: 'Michael Chen',
    role: 'Founder, DesignHub',
    content: 'The customer support is outstanding. They helped us migrate our entire infrastructure seamlessly.',
    avatar: '👨‍💻',
  },
  {
    name: 'Emma Wilson',
    role: 'E-commerce Manager',
    content: '99.9% uptime is real! Our online store has never experienced any downtime.',
    avatar: '👩‍💼',
  },
];

const Testimonials = () => {
  const { t } = useConfig();
  
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('testimonials.title', 'Trusted by businesses worldwide')}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {t('testimonials.subtitle', 'Join thousands of satisfied customers')}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-primary-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">"{testimonial.content}"</p>
              <div className="mt-4 flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
