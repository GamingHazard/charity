'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">🌱</span>
              Seeds of Love
            </h3>
            <p className="text-foreground/70 text-sm">
              Creating lasting change through education, nutrition, and community empowerment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="text-foreground/70 hover:text-foreground transition-colors">Our Programs</Link></li>
              <li><Link href="/get-involved" className="text-foreground/70 hover:text-foreground transition-colors">Get Involved</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="text-sm text-foreground/70 space-y-1">
              <p>hello@seedsoflove.org</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Main Street<br />New York, NY 10001</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; 2024 Seeds of Love Foundation. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
