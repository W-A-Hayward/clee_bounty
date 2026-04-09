type Tone = 'tone-blue' | 'tone-green' | 'tone-orange' | 'tone-red';
type ProjectMilestone = {
    title: string;
    dueLabel: string;
    amount: string;
    status: 'pending' | 'in_progress' | 'submitted' | 'approved';
};
export type StudentProject = {
    slug: string;
    title: string;
    company: string;
    industry: string;
    category: string;
    workMode: string;
    duration: string;
    budget: string;
    compensationType: string;
    experienceLevel: string;
    deadlineLabel: string;
    postedLabel: string;
    summary: string;
    description: string;
    companySummary: string;
    fitReason: string;
    skills: string[];
    applicationChecklist: string[];
    matchScore: number;
    tone: Tone;
    deliverables: string[];
    milestones: ProjectMilestone[];
};
export type CompanyProject = {
    id: string;
    publicSlug?: string;
    companyName: string;
    companyUserId: string;
    title: string;
    status: 'draft' | 'open' | 'in_review' | 'matched' | 'in_progress';
    applicants: number;
    shortlisted: number;
    budget: string;
    workMode: string;
    projectType: string;
    experienceLevel: string;
    deadlineLabel: string;
    owner: string;
    summary: string;
    requiredSkills: string[];
    nextStep: string;
    tone: Tone;
    createdAt: string;
};
export type StudentApplication = {
    id: string;
    projectSlug: string;
    projectTitle: string;
    companyName: string;
    studentUserId: string;
    status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted';
    appliedLabel: string;
    note: string;
    createdAt: string;
};
export type StudentMessage = {
    id: string;
    company: string;
    projectSlug: string;
    studentUserId: string;
    preview: string;
    lastActive: string;
    unread: number;
    thread: string[];
    updatedAt: string;
};
export type CompanyApplicant = {
    id: string;
    projectSlug: string;
    projectTitle: string;
    companyName: string;
    status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted';
    appliedLabel: string;
    note: string;
    studentName: string;
    studentSchool: string;
    studentProgram: string;
    studentPortfolio: string;
    studentRate: string;
    studentAvailability: string;
};
export type CompanyMessageThread = {
    id: string;
    company: string;
    projectSlug: string;
    preview: string;
    lastActive: string;
    unread: number;
    thread: string[];
    studentName: string;
    studentEmail: string;
};
export type StudentProfileUpdate = {
    name?: string;
    school?: string;
    program?: string;
    portfolioUrl?: string;
    availability?: string;
    rate?: string;
};
type StudentRecord = {
    id: string;
    role: 'member';
    name: string;
    email: string;
    passwordHash: string;
    school: string;
    program: string;
    portfolioUrl: string;
    availability: string;
    rate: string;
    createdAt: string;
};
type CompanyRecord = {
    id: string;
    role: 'company';
    name: string;
    email: string;
    passwordHash: string;
    companyName: string;
    website: string;
    industry: string;
    location: string;
    teamSize: string;
    description: string;
    createdAt: string;
};
export type MemberSession = Omit<StudentRecord, 'createdAt' | 'id' | 'passwordHash'>;
export type CompanySession = Omit<CompanyRecord, 'createdAt' | 'id' | 'passwordHash'>;
export type SessionUser = MemberSession | CompanySession;
export type MemberAuthPayload = {
    name: string;
    email: string;
    password: string;
    school?: string;
    program?: string;
    portfolioUrl?: string;
    availability?: string;
    rate?: string;
};
export type CompanyAuthPayload = {
    name: string;
    email: string;
    password: string;
    companyName: string;
    website?: string;
    industry?: string;
    location?: string;
    teamSize?: string;
    description?: string;
};
export type CompanyProjectDraft = {
    title: string;
    projectType: string;
    budget: string;
    workMode: string;
    duration: string;
    experienceLevel: string;
    deadlineLabel: string;
    skills: string[];
    deliverables: string[];
    reviewCadence: string;
    summary: string;
};
export declare class FileStore {
    private data;
    private filePath;
    constructor(filePath: string);
    getSession(token: string): {
        readonly token: string;
        readonly user: MemberSession;
    } | {
        readonly token: string;
        readonly user: CompanySession;
    } | null;
    authenticateStudent(payload: MemberAuthPayload): {
        readonly token: string;
        readonly user: SessionUser;
    };
    registerStudent(payload: MemberAuthPayload): {
        readonly token: string;
        readonly user: SessionUser;
    };
    authenticateCompany(payload: CompanyAuthPayload): {
        readonly token: string;
        readonly user: SessionUser;
    };
    registerCompany(payload: CompanyAuthPayload): {
        readonly token: string;
        readonly user: SessionUser;
    };
    destroySession(token: string): void;
    listPublicProjects(): StudentProject[];
    listCompanyProjects(companyUserId: string): CompanyProject[];
    listCompanyProjectsByEmail(email: string): CompanyProject[];
    listApplicationsForStudent(studentUserId: string): {
        id: string;
        projectSlug: string;
        projectTitle: string;
        companyName: string;
        studentUserId: string;
        status: "submitted" | "shortlisted" | "interviewing" | "accepted";
        appliedLabel: string;
        note: string;
    }[];
    listApplicationsForStudentEmail(email: string): {
        id: string;
        projectSlug: string;
        projectTitle: string;
        companyName: string;
        studentUserId: string;
        status: "submitted" | "shortlisted" | "interviewing" | "accepted";
        appliedLabel: string;
        note: string;
    }[];
    listMessagesForStudent(studentUserId: string): {
        id: string;
        company: string;
        projectSlug: string;
        studentUserId: string;
        preview: string;
        lastActive: string;
        unread: number;
        thread: string[];
    }[];
    listMessagesForStudentEmail(email: string): {
        id: string;
        company: string;
        projectSlug: string;
        studentUserId: string;
        preview: string;
        lastActive: string;
        unread: number;
        thread: string[];
    }[];
    listCompanyApplicants(companyEmail: string): CompanyApplicant[];
    listCompanyMessages(companyEmail: string): CompanyMessageThread[];
    updateStudentProfile(email: string, updates: StudentProfileUpdate): MemberSession;
    addStudentMessageReply(messageId: string, studentEmail: string, text: string): void;
    createProject(company: CompanySession, draft: CompanyProjectDraft): StudentProject;
    createApplication(student: MemberSession, payload: {
        projectSlug: string;
        companyName: string;
        note: string;
        projectTitle: string;
    }): {
        message: string;
    };
    private createSessionForStudent;
    private createSessionForCompany;
    private createSession;
    private requireStudentRecord;
    private requireCompanyRecord;
    private emailExists;
    private load;
    private persist;
}
export {};
//# sourceMappingURL=store.d.ts.map