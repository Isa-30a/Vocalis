# Dashboard header user flow

The dashboard header shows the signed-in user's avatar, name and account menu.
The greeting reuses the same profile and shows only the first name.

## Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as Vocalis
    participant Auth as Auth.js

    User->>App: Open dashboard
    App->>Auth: Verify session

    alt No session
        Auth-->>App: Unauthenticated
        App-->>User: Redirect to login
    else Signed in
        Auth-->>App: User profile
        App-->>User: Dashboard with avatar, name and greeting
    end

    User->>App: Open account menu
    App-->>User: Name, email and sign out

    User->>App: Click outside or press Escape
    App-->>User: Close menu

    User->>App: Sign out
    App->>Auth: Clear session
    Auth-->>App: Session cleared
    App-->>User: Redirect to login
```

## Behavior

- The header uses the authenticated user's name, email and avatar.
- The greeting uses only the first name.
- Missing names fall back to the email name; missing avatars fall back to initials.
- Sign-out clears the session and returns to the login page.
