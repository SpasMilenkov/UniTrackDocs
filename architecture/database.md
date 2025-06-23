# Educational Management System - Database Schema Breakdown

## **Level 1: High-Level Group Overview** 📋

The system consists of 5 main functional areas that work together to manage educational institutions:

```mermaid
graph TD
    A[👥 User & People Management] --> F[Central System]
    B[🏫 Academic & Institution Structure] --> F
    C[📊 Performance & Assessment] --> F
    D[💬 Communication & Events] --> F
    E[📈 Analytics & Reporting] --> F

    F --> G[Complete Educational Management Platform]
```

---

## **Level 2: Simplified Entity Overview** 🔗

---

## **1. 👥 User & People Management**

_"Who uses the system"_

**Core Entities:** 16 tables
**Purpose:** Manages all user types, authentication, and relationships

```mermaid
classDiagram
    class AspNetUsers {
        +uuid Id
        +varchar(50) FirstName
        +varchar(50) LastName
        +varchar(2000) RefreshToken
        +varchar(2048) AvatarUrl
        +timestamp RefreshTokenValidity
        +varchar(256) UserName
        +varchar(256) NormalizedUserName
        +varchar(256) Email
        +varchar(256) NormalizedEmail
        +boolean EmailConfirmed
        +text PasswordHash
        +text SecurityStamp
        +text ConcurrencyStamp
        +text PhoneNumber
        +boolean PhoneNumberConfirmed
        +boolean TwoFactorEnabled
        +timestamp LockoutEnd
        +boolean LockoutEnabled
        +integer AccessFailedCount
        +boolean IsLinked
        +boolean DataAnalytics
        +boolean EmailUpdates
        +boolean MarketingEmails
        +text ProfileVisibility
    }

    class Students {
        +uuid Id
        +boolean IsSchoolStudent
        +uuid UserId
        +uuid SchoolId
        +uuid UniversityId
        +uuid GradeId
        +uuid PersonalReportId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +uuid MajorId
        +uuid InstitutionId
        +text Status
    }

    class Teachers {
        +uuid Id
        +varchar(100) Title
        +uuid UserId
        +uuid ClassGradeId
        +uuid InstitutionId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +uuid DepartmentId
        +text Status
    }

    class Parents {
        +uuid Id
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(20) EmergencyContact
        +uuid InstitutionId
        +varchar(1000) Notes
        +varchar(100) Occupation
        +text Status
    }

    class Admins {
        +uuid Id
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(100) Department
        +uuid InstitutionId
        +varchar(1000) Notes
        +varchar(100) Position
        +text Role
        +timestamp StartDate
        +text Status
    }

    class SuperAdmins {
        +uuid Id
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class Applications {
        +uuid Id
        +varchar(50) FirstName
        +varchar(50) LastName
        +varchar(320) Email
        +varchar(20) Phone
        +uuid InstitutionId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(20) Code
        +text Status
    }

    class AspNetRoles {
        +uuid Id
        +varchar(256) Name
        +varchar(256) NormalizedName
        +text ConcurrencyStamp
    }

    class AspNetUserRoles {
        +uuid UserId
        +uuid RoleId
    }

    class AspNetUserClaims {
        +integer Id
        +uuid UserId
        +text ClaimType
        +text ClaimValue
    }

    class AspNetUserLogins {
        +text LoginProvider
        +text ProviderKey
        +text ProviderDisplayName
        +uuid UserId
    }

    class AspNetUserTokens {
        +uuid UserId
        +text LoginProvider
        +varchar(100) Name
        +text Value
    }

    class AspNetRoleClaims {
        +integer Id
        +uuid RoleId
        +text ClaimType
        +text ClaimValue
    }

    class ParentStudent {
        +uuid StudentId
        +uuid ParentId
    }

    class Organizers {
        +uuid Id
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +boolean CanCreatePublicEvents
        +varchar(100) Department
        +uuid InstitutionId
        +varchar(100) Role
    }

    class Attenders {
        +uuid Id
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(1000) AttendanceNotes
        +text AttendanceStatus
        +timestamp CheckInTime
        +timestamp CheckOutTime
    }

    AspNetUsers --> Students
    AspNetUsers --> Teachers
    AspNetUsers --> Parents
    AspNetUsers --> Admins
    AspNetUsers --> SuperAdmins
    AspNetUsers --> Organizers
    AspNetUsers --> Attenders
    AspNetUsers --> AspNetUserRoles
    AspNetUsers --> AspNetUserClaims
    AspNetUsers --> AspNetUserLogins
    AspNetUsers --> AspNetUserTokens
    AspNetRoles --> AspNetUserRoles
    AspNetRoles --> AspNetRoleClaims
    Students --> ParentStudent
    Parents --> ParentStudent
```

**Key Features:**

- Identity management with ASP.NET Core Identity
- Role-based access control
- Multi-institutional support
- Parent-student relationships
- Application workflow for new users

---

## **2. 🏫 Academic & Institution Structure**

_"The educational framework"_

**Core Entities:** 18 tables
**Purpose:** Defines the academic hierarchy and course structure

```mermaid
classDiagram
    class Institutions {
        +uuid Id
        +varchar(150) Name
        +varchar(2000) Description
        +text Type
        +text Location
        +text Accreditations
        +uuid AddressId
        +varchar(2048) LogoUrl
        +timestamp EstablishedDate
        +varchar(2048) Website
        +varchar(320) Email
        +varchar(20) Phone
        +varchar(300) Motto
        +text IntegrationStatus
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +uuid ApplicationUserId
    }

    class Schools {
        +uuid Id
        +integer StudentCount
        +double StudentTeacherRatio
        +boolean HasSpecialEducation
        +boolean HasUniform
        +text[] Programs
        +uuid SchoolReportId
        +uuid InstitutionId
    }

    class Universities {
        +uuid Id
        +integer[] FocusAreas
        +integer UndergraduateCount
        +integer GraduateCount
        +double AcceptanceRate
        +integer ResearchFunding
        +boolean HasStudentHousing
        +text[] Departments
        +uuid UniversityReportId
        +uuid InstitutionId
    }

    class Faculties {
        +uuid Id
        +varchar(100) Name
        +varchar(500) ShortDescription
        +varchar(2000) DetailedDescription
        +uuid UniversityId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(20) Code
        +varchar(320) ContactEmail
        +varchar(20) ContactPhone
        +text Status
        +varchar(2048) Website
    }

    class Departments {
        +uuid Id
        +varchar(100) Name
        +varchar(20) Code
        +varchar(2000) Description
        +varchar(200) Location
        +varchar(320) ContactEmail
        +varchar(20) ContactPhone
        +text Type
        +text Status
        +uuid FacultyId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class Majors {
        +uuid Id
        +varchar(100) Name
        +uuid FacultyId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(2000) AdmissionRequirements
        +varchar(2000) CareerOpportunities
        +varchar(20) Code
        +varchar(2000) DetailedDescription
        +integer DurationInYears
        +integer RequiredCredits
        +varchar(500) ShortDescription
    }

    class AcademicYears {
        +uuid Id
        +varchar(100) Name
        +timestamp StartDate
        +timestamp EndDate
        +uuid InstitutionId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class Semesters {
        +uuid Id
        +varchar(100) Name
        +timestamp StartDate
        +timestamp EndDate
        +uuid AcademicYearId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +timestamp AddDropDeadline
        +varchar(2000) Description
        +timestamp FinalExamEndDate
        +timestamp FinalExamStartDate
        +timestamp GradeSubmissionDeadline
        +timestamp MidtermEndDate
        +timestamp MidtermStartDate
        +timestamp RegistrationEndDate
        +timestamp RegistrationStartDate
        +text Status
        +text Type
        +integer WeekCount
        +timestamp WithdrawalDeadline
    }

    class Subjects {
        +uuid Id
        +varchar(100) Name
        +varchar(500) ShortDescription
        +varchar(3000) DetailedDescription
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +text AcademicLevel
        +varchar(20) Code
        +integer CreditHours
        +numeric CreditValue
        +uuid DepartmentId
        +text ElectiveType
        +boolean HasLab
        +boolean IsElective
        +integer MaxGradeLevel
        +integer MaxStudents
        +integer MinGradeLevel
        +uuid PrimaryTeacherId
        +text SubjectType
        +uuid MajorId
        +uuid InstitutionId
    }

    class Grades {
        +uuid Id
        +varchar(100) Name
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +uuid HomeRoomTeacherId
        +uuid AcademicYearId
        +uuid InstitutionId
    }

    class ElectiveSubjects {
        +uuid Id
        +varchar(100) Name
        +varchar(2000) Description
        +integer MaxStudents
        +text Type
        +uuid TeacherId
        +uuid GradeId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class SchoolAddress {
        +uuid Id
        +varchar(200) Country
        +varchar(200) Settlement
        +varchar(20) PostalCode
        +varchar(200) Street
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class Images {
        +uuid Id
        +text Url
        +uuid InstitutionId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class HomeRoomTeacher {
        +uuid Id
        +uuid TeacherId
        +uuid GradeId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class SubjectGrades {
        +uuid GradesId
        +uuid SubjectsId
    }

    class SubjectTeachers {
        +uuid SubjectsId
        +uuid TeachersId
    }

    class TeacherGrades {
        +uuid GradesId
        +uuid TeachersId
    }

    class StudentElectives {
        +uuid Id
        +uuid StudentId
        +uuid ElectiveSubjectId
        +timestamp EnrollmentDate
        +text Status
        +uuid SubjectId
    }

    Institutions --> Schools
    Institutions --> Universities
    Institutions --> SchoolAddress
    Institutions --> Images
    Universities --> Faculties
    Faculties --> Departments
    Faculties --> Majors
    Departments --> Subjects
    AcademicYears --> Semesters
    AcademicYears --> Grades
    Grades --> ElectiveSubjects
    Grades --> HomeRoomTeacher
    Grades --> SubjectGrades
    Grades --> TeacherGrades
    Subjects --> SubjectGrades
    Subjects --> SubjectTeachers
    Subjects --> StudentElectives
    ElectiveSubjects --> StudentElectives
```

**Key Features:**

- Multi-institutional support (Schools & Universities)
- Hierarchical academic structure
- Flexible semester/year management
- Subject and major organization
- Grade level management

---

## **3. 📊 Performance & Assessment**

_"Day-to-day academic tracking"_

**Core Entities:** 6 tables
**Purpose:** Tracks student performance, attendance, and grading

```mermaid
classDiagram
    class Marks {
        +uuid Id
        +numeric Value
        +varchar(100) Topic
        +varchar(2000) Description
        +uuid SubjectId
        +uuid TeacherId
        +uuid StudentId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +text Type
        +uuid SemesterId
    }

    class Absences {
        +uuid Id
        +timestamp Date
        +text Status
        +varchar(250) Reason
        +boolean IsExcused
        +uuid StudentId
        +uuid SubjectId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +uuid TeacherId
        +uuid SemesterId
    }

    class GradingSystems {
        +uuid Id
        +varchar(100) Name
        +varchar(2000) Description
        +text Type
        +boolean IsDefault
        +numeric MinimumPassingScore
        +numeric MaximumScore
        +uuid InstitutionId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class GradeScales {
        +uuid Id
        +text Grade
        +varchar(2000) Description
        +numeric MinimumScore
        +numeric MaximumScore
        +double GpaValue
        +uuid GradingSystemId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class Attenders {
        +uuid Id
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +varchar(1000) AttendanceNotes
        +text AttendanceStatus
        +timestamp CheckInTime
        +timestamp CheckOutTime
    }

    class Recommendations {
        +uuid Id
        +varchar(100) Topic
        +varchar(2048) SourceLink
        +timestamp Date
        +uuid UserId
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    Students --> Marks
    Students --> Absences
    Students --> Attenders
    Subjects --> Marks
    Subjects --> Absences
    Teachers --> Marks
    Teachers --> Absences
    Semesters --> Marks
    Semesters --> Absences
    GradingSystems --> GradeScales
    AspNetUsers --> Recommendations
```

**Key Features:**

- Flexible marking system with topic-based grades
- Comprehensive absence tracking
- Configurable grading systems and scales
- Real-time attendance monitoring
- Multi-semester performance tracking

---

## **4. 💬 Communication & Events**

_"Interaction and scheduling"_

**Core Entities:** 7 tables
**Purpose:** Facilitates communication and event management

```mermaid
classDiagram
    class Events {
        +uuid Id
        +varchar(150) Title
        +varchar(150) Topic
        +varchar(500) Description
        +uuid OrganizerId
        +uuid StudentId
        +uuid TeacherId
        +uuid InstitutionId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +timestamp EndDate
        +boolean IsAllDay
        +boolean IsRecurring
        +varchar(200) Location
        +integer MaxParticipants
        +varchar(2048) MeetingLink
        +varchar(1000) Notes
        +text RecurrencePattern
        +boolean RequiresApproval
        +timestamp StartDate
        +text Status
        +text Type
    }

    class ChatMessages {
        +uuid Id
        +uuid SenderId
        +uuid RecipientId
        +uuid GroupId
        +varchar(4000) Content
        +text MessageType
        +text Status
        +timestamp SentAt
        +timestamp DeliveredAt
        +timestamp ReadAt
        +uuid ParentMessageId
        +varchar(2048) AttachmentUrl
        +text AttachmentType
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +timestamp DeletedAt
        +uuid DeletedBy
        +timestamp EditedAt
        +boolean IsDeleted
        +varchar(4000) OriginalContent
    }

    class EventNotifications {
        +uuid Id
        +uuid EventId
        +uuid UserId
        +text Type
        +timestamp SendAt
        +boolean IsSent
        +varchar(4000) Message
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class Participants {
        +uuid Id
        +uuid UserId
        +uuid EventId
        +timestamp CreatedAt
        +timestamp UpdatedAt
        +boolean IsRequired
        +timestamp ResponseDate
        +varchar(1000) ResponseNote
        +text Status
    }

    class MessageReactions {
        +uuid Id
        +uuid MessageId
        +uuid UserId
        +text ReactionType
        +timestamp ReactedAt
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class MessageEditHistory {
        +uuid Id
        +uuid MessageId
        +varchar(4000) PreviousContent
        +varchar(4000) NewContent
        +timestamp EditedAt
        +varchar(250) EditReason
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class EventAttenders {
        +uuid AttenderId
        +uuid EventId
    }

    Events --> Participants
    Events --> EventNotifications
    Events --> EventAttenders
    ChatMessages --> MessageReactions
    ChatMessages --> MessageEditHistory
    ChatMessages --> ChatMessages
    Organizers --> Events
    Students --> Events
    Teachers --> Events
    Institutions --> Events
    AspNetUsers --> ChatMessages
    AspNetUsers --> EventNotifications
    AspNetUsers --> Participants
    AspNetUsers --> MessageReactions
    Attenders --> EventAttenders
```

**Key Features:**

- Comprehensive event management system
- Real-time messaging with reactions
- Automated notification system
- Event participation tracking
- Role-based event creation

---

## **5. 📈 Analytics & Reporting**

_"Insights and data analysis"_

**Core Entities:** 4 tables
**Purpose:** Generates insights and performance reports

```mermaid
classDiagram
    class InstitutionAnalyticsReports {
        +uuid Id
        +uuid InstitutionId
        +timestamp From
        +timestamp To
        +text PeriodType
        +numeric OverallAcademicScore
        +numeric YearOverYearGrowth
        +integer TotalEnrollments
        +numeric EnrollmentGrowthRate
        +numeric AverageAttendanceRate
        +numeric StudentTeacherRatio
        +numeric TeacherRetentionRate
        +text OverallPerformanceCategory
        +text SubjectPerformanceScores
        +text DepartmentRankings
        +text PopularMajors
        +text MajorGrowthRates
        +text NationalRankings
        +text RegionalRankings
        +text TopAchievements
        +text FastestGrowingAreas
        +text StrongestSubjects
        +text ExecutiveSummary
        +text AIGeneratedInsights
        +boolean IsPublic
        +timestamp PublishedAt
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class MarketAnalyticsReports {
        +uuid Id
        +text ReportType
        +text PeriodType
        +text ReportPeriod
        +integer TotalInstitutions
        +integer TotalStudents
        +numeric MarketGrowthRate
        +numeric AverageInstitutionScore
        +text EnrollmentLeaders
        +text AcademicLeaders
        +text FastestGrowing
        +text SubjectLeaders
        +text TrendingMajors
        +text DecliningMajors
        +text RegionalBreakdown
        +text MarketInsights
        +text FutureProjections
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class ReportGenerationJobs {
        +uuid Id
        +uuid InstitutionId
        +text PeriodType
        +text ReportType
        +timestamp ScheduledFor
        +text Status
        +timestamp StartedAt
        +timestamp CompletedAt
        +uuid GeneratedReportId
        +text ErrorMessage
        +text ProcessingLogs
        +text JobParameters
        +integer RetryCount
        +integer MaxRetries
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    class ReportVisibilitySettings {
        +uuid Id
        +uuid InstitutionId
        +boolean AllowPublicSharing
        +boolean ShowInMarketReports
        +boolean AllowPeerComparison
        +text CustomTitle
        +text CustomDescription
        +varchar(2048) LogoUrl
        +text HighlightedAchievements
        +text CustomMetrics
        +boolean HideStudentCount
        +boolean HideFinancialData
        +boolean HideDetailedBreakdown
        +timestamp CreatedAt
        +timestamp UpdatedAt
    }

    Institutions --> InstitutionAnalyticsReports
    Institutions --> ReportGenerationJobs
    Institutions --> ReportVisibilitySettings
```

**Key Features:**

- Automated report generation
- AI-powered insights
- Market-wide analytics
- Customizable visibility settings
- Scheduled reporting system

---

## **Summary**

This educational management system provides a comprehensive platform covering:

- **User Management**: 16 tables managing authentication and user roles
- **Academic Structure**: 18 tables defining institutional hierarchy
- **Performance Tracking**: 6 tables for grades and attendance
- **Communication**: 7 tables for messaging and events
- **Analytics**: 4 tables for reporting and insights

**Total: 51 database tables** working together to create a complete educational ecosystem.
