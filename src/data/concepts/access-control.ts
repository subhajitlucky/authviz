import { Concept } from "./types"

export const rbac: Concept = {
  id: "rbac",
  title: "Role-Based Access Control (RBAC)",
  category: "access-control",
  difficulty: "intermediate",
  shortDescription: "Access control through role assignments with predefined permission sets",
  analogy: "RBAC is like a company's building access - interns, managers, and executives each have different key cards that open specific doors (conference rooms, server rooms, executive floor).",
  details: `**How RBAC Works**
  Permissions are not assigned directly to users. Instead, users are assigned roles, and roles have permissions.

  **The RBAC Model:**
  \`\`\`
  Users → Roles → Permissions → Resources
  \`\`\`

  **Key Components:**

  **Users:** Individual people or entities
  \`\`\`
  User: alice, bob, charlie
  \`\`\`

  **Roles:** Job functions or responsibilities
  \`\`\`
  Role: admin, editor, viewer, moderator
  \`\`\`

  **Permissions:** What actions are allowed
  \`\`\`
  Permission: users:read, users:write, posts:delete
  \`\`\`

  **Example Configuration:**
  \`\`\`
  // Define permissions
  Permission 'admin': [read, write, delete, manage_users]
  Permission 'editor': [read, write]
  Permission 'viewer': [read]

  // Assign to roles
  Role 'admin' → [admin, editor, viewer permissions]
  Role 'editor' → [editor permissions]
  Role 'viewer' → [viewer permissions]

  // Assign roles to users
  User Alice → [admin role]
  User Bob → [editor role]
  User Charlie → [viewer role]
  \`\`\`

  **RBAC Benefits:**
  - Simple to understand and manage
  - Easy to audit (who has what role)
  - Scales well for most applications
  - Separation of duties possible

  **RBAC Limitations:**
  - Not flexible for complex scenarios
  - Role explosion in large systems
  - Doesn't consider context (time, location)
  - Hierarchical structures limited`,
  visualType: "diagram",
  relatedConcepts: ["abac", "rebac", "scopes"]
}

export const abac: Concept = {
  id: "abac",
  title: "Attribute-Based Access Control (ABAC)",
  category: "access-control",
  difficulty: "advanced",
  shortDescription: "Dynamic access control based on multiple attributes including user, resource, environment, and action",
  analogy: "ABAC is like airport security - your access (boarding zone) depends on many attributes: ticket class, frequent flyer status, time of day, destination country, and TSA PreCheck eligibility.",
  details: `**What Makes ABAC Different?**
  Unlike RBAC (which uses static roles), ABAC evaluates multiple attributes to make dynamic access decisions.

  **Attribute Categories:**

  **Subject Attributes (Who)**
  - User ID, role, department, security clearance
  - Employment status, manager, location
  - Certifications, training completed

  **Resource Attributes (What)**
  - Owner, classification, type, sensitivity
  - Creation date, last modified, location
  - Required clearance level

  **Action Attributes (How)**
  - Read, write, delete, approve, submit
  - Export, print, share

  **Environment Attributes (When/Where)**
  - Time of day, day of week
  - IP address, geographic location
  - Device type, network (VPN/corporate)
  - Current threat level

  **Example Policy:**
  \`\`\`
  ALLOW user
  IF user.department = resource.department
  AND user.security_clearance >= resource.classification
  AND action = "read"
  AND time_between(9am, 5pm)
  AND user.location = "office"
  \`\`\`

  **ABAC Benefits:**
  - Extremely flexible and expressive
  - Context-aware decisions
  - Fine-grained control
  - Supports complex policies

  **ABAC Challenges:**
  - Complex to implement
  - Performance impact (many evaluations)
  - Harder to audit
  - Policy management complexity`,
  visualType: "diagram",
  relatedConcepts: ["rbac", "rebac"]
}

export const rebac: Concept = {
  id: "rebac",
  title: "Relationship-Based Access Control (ReBAC)",
  category: "access-control",
  difficulty: "advanced",
  shortDescription: "Access control based on relationships between users and resources",
  analogy: "ReBAC is like social media privacy - you can see a post because you're friends with the author, or you're in the same group, or you're tagged in it. Access depends on your relationship graph.",
  details: `**What is ReBAC?**
  Access is granted based on explicit relationships in a graph structure. "Alice can access this document because she created it OR is a member of the team that owns it."

  **The Graph Model:**
  \`\`\`
  Users ←→ Relationships ←→ Resources
  \`\`\`

  **Relationship Types:**
  - **Ownership:** created_by, owned_by
  - **Membership:** member_of, team_of
  - **Parental:** parent_of, ancestor_of
  - **Sharing:** shared_with, can_view
  - **Delegation:** delegated_by, can_act_on_behalf_of

  **Example Policy:**
  \`\`\`
  ALLOW user
  IF user = resource.owner
  OR user IN resource.team.members
  OR resource.visibility = "public"
  OR user HAS_RELATIONSHIP "friend" WITH resource.owner
  \`\`\`

  **Use Cases:**

  **Google Docs / Drive:**
  - Owner: Full control
  - Editor: Can modify
  - Commenter: Can comment only
  - Viewer: Read-only
  - Custom: Specific permissions

  **Social Media:**
  - Public: Anyone can view
  - Friends-only: Relationship exists
  - Custom lists: Specific users/groups

  **Enterprise Organizations:**
  - Direct reports (manager → employee)
  - Project teams
  - Department hierarchy

  **ReBAC Benefits:**
  - Natural modeling of real relationships
  - Highly flexible
  - Easy to share with relationships
  - Scales with graph databases

  **ReBAC Challenges:**
  - Complex policy evaluation
  - Requires graph traversal
  - Performance at scale
  - Policy debugging complexity`,
  visualType: "diagram",
  relatedConcepts: ["rbac", "abac"]
}

export const accessControlConcepts = [
  rbac,
  abac,
  rebac,
]
