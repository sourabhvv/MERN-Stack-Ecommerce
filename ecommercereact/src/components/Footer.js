import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <footer class="bg-gray-100 text-gray-800 py-12">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">
            <h3 class="text-xl font-semibold">Company Name</h3>
            <p class="mt-2">123 Street, City</p>
            <p>Country, ZIP</p>
        </div>
        <div class="mb-6 md:mb-0">
            <h3 class="text-xl font-semibold">Customer Service</h3>
            <ul class="mt-2 space-y-2">
                <li><Link to="/" class="hover:underline">Contact Us</Link></li>
                <li><Link to="/" class="hover:underline">FAQs</Link></li>
                <li><Link to="/" class="hover:underline">Shipping</Link></li>
                <li><Link to="/" class="hover:underline">Returns</Link></li>
            </ul>
        </div>
        <div class="mb-6 md:mb-0">
            <h3 class="text-xl font-semibold">Stay Connected</h3>
            <p class="mt-2">Follow us on social media</p>
            <div class="flex mt-2 space-x-4">
                <Link to="/" class="text-gray-800 hover:text-gray-600"><i class="fab fa-facebook-f"></i></Link>
                <Link to="/" class="text-gray-800 hover:text-gray-600"><i class="fab fa-twitter"></i></Link>
                <Link to="/" class="text-gray-800 hover:text-gray-600"><i class="fab fa-instagram"></i></Link>
            </div>
        </div>
    </div>
    <div class="bg-gray-200 py-4 mt-8">
        <p class="text-center">&copy; 2023 Company Name. All rights reserved.</p>
    </div>
</footer>

  )
}

export default Footer