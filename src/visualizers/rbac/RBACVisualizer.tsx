import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Shield, Lock, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

interface User {
  name: string
  role: "admin" | "moderator" | "user"
}

interface Resource {
  name: string
  permission: "read" | "write" | "delete" | "admin"
}

export function RBACVisualizer() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const users: User[] = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "moderator" },
    { name: "Charlie", role: "user" },
  ]

  const resources: Resource[] = [
    { name: "View Dashboard", permission: "read" },
    { name: "Edit Posts", permission: "write" },
    { name: "Delete Users", permission: "delete" },
    { name: "Admin Settings", permission: "admin" },
  ]

  const rolePermissions = {
    admin: ["read", "write", "delete", "admin"],
    moderator: ["read", "write", "delete"],
    user: ["read"],
  }

  const checkAccess = () => {
    if (!selectedUser || !selectedResource) return null
    const hasAccess = rolePermissions[selectedUser.role].includes(selectedResource.permission)
    return hasAccess
  }

  return (
    <div className="space-y-6">
      {/* User Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Select User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {users.map((user) => (
              <button
                key={user.name}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  selectedUser?.name === user.name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-muted-foreground hover:border-primary/50"
                }`}
              >
                <Users className="h-4 w-4" />
                {user.name}
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted-foreground/20">
                  {user.role}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Select Resource
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {resources.map((resource) => (
              <button
                key={resource.name}
                onClick={() => setSelectedResource(resource)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  selectedResource?.name === resource.name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-muted-foreground hover:border-primary/50"
                }`}
              >
                <Lock className="h-4 w-4" />
                {resource.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Check Result */}
      {selectedUser && selectedResource && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Access Check Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-8 py-6">
                <div className="text-center">
                  <motion.div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      selectedUser.role === "admin"
                        ? "bg-primary/10 border-2 border-primary"
                        : selectedUser.role === "moderator"
                        ? "bg-warning/10 border-2 border-warning"
                        : "bg-muted border-2 border-muted-foreground"
                    }`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Users className="h-10 w-10" />
                  </motion.div>
                  <p className="font-medium mt-2">{selectedUser.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedUser.role}</p>
                </div>

                <ArrowRight className="h-8 w-8 text-muted-foreground" />

                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    checkAccess()
                      ? "bg-success/10 border-2 border-success"
                      : "bg-destructive/10 border-2 border-destructive"
                  }`}>
                    {checkAccess() ? (
                      <CheckCircle className="h-10 w-10 text-success" />
                    ) : (
                      <XCircle className="h-10 w-10 text-destructive" />
                    )}
                  </div>
                  <p className="font-medium mt-2">
                    {checkAccess() ? "ACCESS GRANTED" : "ACCESS DENIED"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedResource.name}
                  </p>
                </div>
              </div>

              {/* Permissions Matrix */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">Role Permissions Matrix:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Role</th>
                        <th className="text-center py-2 px-3">Read</th>
                        <th className="text-center py-2 px-3">Write</th>
                        <th className="text-center py-2 px-3">Delete</th>
                        <th className="text-center py-2 px-3">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { role: "admin", perms: ["yes", "yes", "yes", "yes"] },
                        { role: "moderator", perms: ["yes", "yes", "yes", "no"] },
                        { role: "user", perms: ["yes", "no", "no", "no"] },
                      ].map((row) => (
                        <tr key={row.role} className="border-b">
                          <td className="py-2 px-3 capitalize">{row.role}</td>
                          {row.perms.map((perm, i) => (
                            <td key={i} className="text-center py-2 px-3">
                              {perm === "yes" ? (
                                <CheckCircle className="h-4 w-4 text-success mx-auto" />
                              ) : (
                                <XCircle className="h-4 w-4 text-muted-foreground/50 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* RBAC Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Use RBAC?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Simple Management</h4>
              <p className="text-sm text-muted-foreground">
                Assign permissions to roles, then assign users to roles. Easy to understand and maintain.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Audit Ready</h4>
              <p className="text-sm text-muted-foreground">
                Easy to audit who has what permissions. Just check which roles exist and who has them.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Scalable</h4>
              <p className="text-sm text-muted-foreground">
                Add new users by assigning existing roles. Update permissions once for all users.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
