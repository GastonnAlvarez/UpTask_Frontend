import { Project, TeamMember } from "../types";

export const isManager = (mannagerId: Project['_id'], userId: TeamMember['_id']) => mannagerId === userId