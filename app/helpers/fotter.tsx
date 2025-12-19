export default function BeautifulFooter() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo / About */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              Bangladeshi All News
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Trusted news source covering Bangladesh & international updates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/abouts" className="hover:text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Politics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Entertainment
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Get the latest news in your inbox.
            </p>

            <div className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md outline-none"
              />
              <button className="px-4 bg-indigo-600 hover:bg-indigo-700 text-sm text-white rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Bangladeshi All News — All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
