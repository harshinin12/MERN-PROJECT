import React  from 'react';
import Footer from './Footer'; 
function Home() {

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Explore Stays on our site-booking-platform</h1>
        


        {/* Properties listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/images/property1.jpg" 
              alt="Property 1" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Beautiful Beachside House</h2>
            <p className="text-gray-600">2 guests · 1 bedroom · 1 bath</p>
            <p className="text-red-500 mt-2">$120 / night</p>
          </div>

          {/* Property 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/images/property2.jpg" 
              alt="Property 2" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Mountain Cabin Retreat</h2>
            <p className="text-gray-600">4 guests · 2 bedrooms · 2 baths</p>
            <p className="text-red-500 mt-2">$250 / night</p>
          </div>

          {/* Property 3 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/images/property3.jpg" 
              alt="Property 3" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Luxury Downtown Apartment</h2>
            <p className="text-gray-600">2 guests · 1 bedroom · 1 bath</p>
            <p className="text-red-500 mt-2">$180 / night</p>
          </div>

          {/* Property 4 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/images/property4.jpg" 
              alt="Property 4" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Cozy Countryside Cottage</h2>
            <p className="text-gray-600">3 guests · 1 bedroom · 1 bath</p>
            <p className="text-red-500 mt-2">$100 / night</p>
          </div>

          {/* Property 5 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/images/property5.jpg" 
              alt="Property 5" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Modern City Loft</h2>
            <p className="text-gray-600">2 guests · 1 bedroom · 1 bath</p>
            <p className="text-red-500 mt-2">$200 / night</p>
          </div>

          {/* Property 6 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src="/images/property6.jpg" 
              alt="Property 6" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">Rustic Lakefront Cabin</h2>
            <p className="text-gray-600">4 guests · 2 bedrooms · 2 baths</p>
            <p className="text-red-500 mt-2">$300 / night</p>
          </div>

        </div>

  
      </div>
       {/* Footer */}
       <Footer />
    </div>
  );
}

export default Home;
