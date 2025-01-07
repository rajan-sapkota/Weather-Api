import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Rajan Sapkota. All Rights Reserved.
        </p>
        <p className="mt-2">
          <a
            href="mailto:rajan@example.com"  // Replace with your actual email or contact link
            className="text-blue-400 hover:text-blue-500"
          >
            Contact
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;