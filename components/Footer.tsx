import React from "react";

const Footer = async () => {
  return (
    <footer className="p-6 mt-5 items-center border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"></div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Aleksandar Drakaliyski. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
