export default function Footer() {
  return (
    <footer className="border-t mt-12 py-8">
      <div className="max-w-6xl mx-auto text-center text-gray-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">About Us</h3>
            <p className="text-sm">
              Discover the best food delivery experience with FOOD NEXT.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>Home</li>
              <li>Menu</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Contact</h3>
            <ul className="text-sm space-y-2">
              <li>Phone: 123-456-7890</li>
              <li>Email: info@foodnext.com</li>
              <li>Address: 123 Food Street</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Follow Us</h3>
            <ul className="text-sm space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          &copy; {new Date().getFullYear()} FOOD NEXT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
