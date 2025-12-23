import { Link } from "react-router-dom"
import { Shield, Github, Twitter, Mail, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: "Concepts", href: "/concepts" },
      { label: "Auth Lab", href: "/lab" },
      { label: "Visualizations", href: "/concepts" },
    ],
    topics: [
      { label: "Authentication", href: "/concepts/auth-vs-authz" },
      { label: "OAuth 2.0", href: "/concepts/oauth2-overview" },
      { label: "JWT Tokens", href: "/concepts/jwt-structure" },
      { label: "RBAC vs ABAC", href: "/concepts/rbac" },
    ],
    resources: [
      { label: "Security Best Practices", href: "/lab" },
      { label: "OWASP Guidelines", href: "/lab" },
      { label: "API Reference", href: "/lab" },
    ],
  }

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/20">
      <div className="px-6 md:px-10 lg:px-16 py-16 max-w-[1600px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
                <Shield className="h-7 w-7 text-primary relative" />
              </motion.div>
              <span className="font-bold text-xl gradient-text">AuthViz</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              The most comprehensive interactive platform for learning authentication and authorization.
              Master security concepts through hands-on visualizations.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Mail, href: "mailto:hello@authviz.com", label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Topics</h3>
            <ul className="space-y-3">
              {footerLinks.topics.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} AuthViz. Educational purposes only.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {["Privacy", "Terms", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="hover:text-foreground transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
