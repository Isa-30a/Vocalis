# Dashboard header user flow

The dashboard header shows the signed-in user's avatar, name and account menu.
The greeting reuses the same profile and shows only the first name.

## Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Web as Web app
    participant API as Backend

    User->>Web: Open dashboard
    Web->>API: Load dashboard
    API->>API: Verify session

    alt No session
        API-->>Web: Unauthenticated
        Web-->>User: Login page
    else Signed in
        API-->>Web: User profile
        Web-->>User: Dashboard with avatar, name and greeting
    end

    User->>Web: Open account menu
    Web-->>User: Name, email and sign out

    User->>Web: Click outside or press Escape
    Web-->>User: Close menu

    User->>Web: Sign out
    Web->>API: Clear session
    API-->>Web: Session cleared
    Web-->>User: Login page
```

## Behavior

- The header uses the authenticated user's name, email and avatar.
- The greeting uses only the first name.
- Missing names fall back to the email name; missing avatars fall back to initials.
- Sign-out clears the session and returns to the login page.
