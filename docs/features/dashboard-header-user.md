# Dashboard header user flow

This feature replaces the mocked current user in the dashboard header with the
authenticated Auth.js session user. The dashboard greeting uses the same user,
showing only the first name.

## Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser
    participant Proxy as Route protection
    participant Page as Dashboard page
    participant Auth as Auth.js
    participant Header as AppHeader / UserMenu
    participant Action as Sign-out action

    User->>Browser: Open /dashboard
    Browser->>Proxy: GET /dashboard
    Proxy->>Auth: auth()

    alt No session
        Auth-->>Proxy: null
        Proxy-->>Browser: Redirect to /login
        Browser-->>User: Login page
    else Valid session
        Auth-->>Proxy: session
        Proxy->>Page: Render dashboard
        Page->>Auth: auth()
        Auth-->>Page: session.user
        Page->>Page: getFirstName(session.user)
        Page->>Header: <AppHeader user={session.user} />
        Header->>Header: getDisplayName(session.user)
        Header->>Header: getInitials(session.user)
        Header-->>Browser: Avatar, name and user menu
        Page-->>Browser: "Hola, {firstName}"
    end

    User->>Header: Click the avatar
    Header-->>User: Show name, email and sign-out action
    User->>Header: Click outside or press Escape
    Header-->>User: Close the menu

    User->>Header: Click "Cerrar sesión"
    Header->>Action: Submit sign-out form
    Action->>Auth: signOut({ redirectTo: "/login" })
    Auth-->>Browser: Clear the session and redirect
    Browser-->>User: Login page
```

## Fallback rules

- `getDisplayName`: trimmed name, then the email local part, then `"Invitado"`.
- `getFirstName`: first word of the display name for the greeting.
- `getInitials`: initials derived from the name or email; apostrophes are treated
  as separators, so `"O'Connor"` becomes `"OC"`.
- `user.image` is rendered when present. The initials avatar is used otherwise.
- The user menu closes on an outside pointer event or `Escape`. `Escape` returns
  focus to the menu summary.
