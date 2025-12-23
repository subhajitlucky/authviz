import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import {
  ArrowRight, Key, Shield, Lock, Users, BookOpen,
  Fingerprint, Smartphone, Server, AlertTriangle,
  CheckCircle, Zap, Layers, Target
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Layers,
    title: "Interactive Visualizations",
    description: "Watch authentication flows come to life with smooth animations and clear explanations.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Hands-on Labs",
    description: "Experiment with JWTs, OAuth flows, and security scenarios in our browser-based lab.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Fingerprint,
    title: "Security First",
    description: "Learn about vulnerabilities like CSRF, XSS, and how to defend against them.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Smartphone,
    title: "Real-World Examples",
    description: "Understand how Google, Facebook, and enterprise systems handle authentication.",
    color: "from-green-500 to-emerald-500",
  },
]

const conceptCategories = [
  {
    title: "Authentication Fundamentals",
    concepts: ["Auth vs Authz", "Sessions vs Tokens", "JWT Structure", "Stateless Auth"],
    icon: Key,
    color: "primary",
  },
  {
    title: "OAuth 2.0 & OpenID",
    concepts: ["OAuth2 Overview", "Authorization Code", "PKCE", "Scopes"],
    icon: Shield,
    color: "secondary",
  },
  {
    title: "Access Control",
    concepts: ["RBAC", "ABAC", "Permissions", "Policies"],
    icon: Lock,
    color: "accent",
  },
  {
    title: "Security",
    concepts: ["CSRF", "XSS", "Token Security", "MFA"],
    icon: AlertTriangle,
    color: "destructive",
  },
]

const stats = [
  { value: "30+", label: "Concepts" },
  { value: "50+", label: "Visualizations" },
  { value: "100%", label: "Interactive" },
  { value: "Free", label: "Forever" },
]

export function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="text-center space-y-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">Authentication</span>
              <br />
              <span className="text-foreground">& Authorization</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
              Master authentication security through interactive visualizations.
              No backend required - learn directly in your browser.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/concepts">
              <Button size="lg" className="btn-shine gap-2">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/lab">
              <Button size="lg" variant="outline" className="gap-2">
                <Zap className="h-4 w-4" />
                Open Auth Lab
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-2xl glass-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Why AuthViz?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Learn complex authentication concepts through beautiful, interactive visualizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card h-full card-hover group">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Concept Categories */}
      <section className="space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">What You'll Learn</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive coverage of authentication and authorization concepts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {conceptCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card card-hover h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-${category.color}/20 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <category.icon className={`h-6 w-6 text-${category.color}`} />
                    </motion.div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.concepts.map((concept) => (
                      <Link
                        key={concept}
                        to={`/concepts/${concept.toLowerCase().replace(/\s+/g, "-")}`}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-muted hover:bg-primary/20 hover:text-primary transition-colors"
                      >
                        {concept}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/concepts">
            <Button size="lg" variant="outline" className="gap-2">
              Explore All Concepts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">How Token-Based Auth Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Follow the journey of authentication from login to protected resource access.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "User Login", desc: "Credentials verified", color: "primary" },
              { icon: Key, label: "Token Issued", desc: "JWT created & signed", color: "secondary" },
              { icon: Server, label: "API Request", desc: "Token sent with request", color: "accent" },
              { icon: CheckCircle, label: "Access Granted", desc: "Token validated", color: "success" },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card card-hover h-full">
                  <CardContent className="p-6 text-center space-y-3">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-${step.color}/20 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <step.icon className={`h-8 w-8 text-${step.color}`} />
                    </motion.div>
                    <h3 className="font-semibold">{step.label}</h3>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl" />

        <motion.div
          className="relative text-center space-y-6 py-16 px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Master Authentication?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dive into interactive simulations that show exactly how authentication flows work.
            Experiment with JWTs, explore OAuth2, and understand security vulnerabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/concepts">
              <Button size="lg" className="btn-shine gap-2">
                Start Learning Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/lab">
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Try the Lab
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
