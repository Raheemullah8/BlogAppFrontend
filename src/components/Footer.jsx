import React from 'react'

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved | 
          Website developed by <span className="font-bold text-primary">Raheem</span>
        </p>
      </aside>
    </footer>
  )
}

export default Footer
