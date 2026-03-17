# Content Management Dashboard - UI Reference Guide

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Management                        │
│         Edit website content across different sections       │
└─────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total: 10    │ Published: 8 │  Drafts: 2   │ Sections: 5  │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Search Content        │  Section    │  Status  │  Sort By   │
│  [____________]        │  [All ▼]    │  [All▼]  │  [Updated▼]│
└─────────────────────────────────────────────────────────────┘

Showing 10 of 10 content items                  [+ Add New Content]

┌─────────────────────────────────────────────────────────────┐
│ Hero Section                            ✓Published           │
│ Home • Updated 2024-03-10                                   │
│ ┌─────────────────────────────────────┐ [Edit][Unpublish]   │
│ │ Planting Seeds of Love & Hope -     │ [Delete]            │
│ │ Empowering communities through      │                     │
│ │ education, nutrition, and           │                     │
│ │ sustainable development...          │                     │
│ └─────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ About Us                                ✓Published           │
│ About • Updated 2024-03-08                                  │
│ ┌─────────────────────────────────────┐ [Edit][Unpublish]   │
│ │ Founded in 2015, Seeds of Love...   │ [Delete]            │
│ └─────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

## Edit Mode View

When you click "Edit" on a content item:

```
┌─────────────────────────────────────────────────────────────┐
│ Hero Section                            ✓Published           │
│ Home • Updated 2024-03-10                                   │
│ ┌─────────────────────────────────────┐ [Save][Cancel]      │
│ │ ┌──────────────────────────────────┤                     │
│ │ │ Planting Seeds of Love & Hope -   │                    │
│ │ │ Empowering communities through    │                    │
│ │ │ education, nutrition, and         │                    │
│ │ │ sustainable development...        │                    │
│ │ │ [Cursor blinking here]            │                    │
│ │ ├──────────────────────────────────┤                     │
│ │ Character count: 127                │                    │
│ └─────────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## Status Badges

```
✓ Published          (Green background, text color)
Draft                (Yellow background, text color)
```

## Filter Controls

### Section Filter
```
Section
[All ▼]
├── All
├── Home
├── About
├── Programs
├── Get Involved
└── Contact
```

### Status Filter
```
Status
[All ▼]
├── All
├── published
└── draft
```

### Sort By Filter
```
Sort By
[Last Updated ▼]
├── Last Updated
├── Created
└── Title (A-Z)
```

## Action Buttons

### Edit Mode (While editing)
```
[Save]     - Saves content and publishes
[Cancel]   - Discards changes and exits edit mode
```

### View Mode (Normal state)
```
[Edit]          - Enters edit mode for this item
[Publish]       - Publishes a draft item
[Unpublish]     - Unpublishes an item (makes it draft)
[Delete]        - Permanently removes the item
```

## Color Scheme

```
Published Status Badge:
  Background: #20c997 (green-500)
  Opacity: 20%
  Text Color: #006d3f (green-700)

Draft Status Badge:
  Background: #ffc107 (yellow-500)
  Opacity: 20%
  Text Color: #8b5e00 (yellow-700)

Button Colors:
  Primary: oklch(0.55 0.18 40)     (Terracotta/Orange)
  Delete: oklch(0.6 0.2 15)        (Red/Destructive)
  Neutral: Border color
```

## Responsive Behavior

### Desktop (1024px+)
```
┌─ Sidebar ─┬──────── Main Content ────────┐
│ • Content │  [Filter Grid: 4 columns]    │
│ • Other   │  [Content Cards: Full width] │
└───────────┴────────────────────────────┘
```

### Tablet (768px - 1023px)
```
┌─ Sidebar ─┬────── Main Content ─────┐
│ • Content │ [Filter Grid: 2 columns] │
│ • Other   │ [Content Cards: Full]    │
└───────────┴──────────────────────────┘
```

### Mobile (<768px)
```
┌─────────────────────┐
│ ☰ Content Mgmt      │  (Sidebar collapses)
├─────────────────────┤
│ [Filter Grid: 1col] │
├─────────────────────┤
│ [Content Card]      │
│ [Full Width]        │
└─────────────────────┘
```

## Empty State

When no content matches your filters:

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│         No content items found matching your filters.        │
│                                                              │
│                Try adjusting your search or                 │
│                    clearing filters.                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Statistics Cards

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total        │ ● Published  │ ● Drafts     │ Sections     │
│ Content      │              │              │              │
│     10       │       8      │       2      │       5      │
└──────────────┴──────────────┴──────────────┴──────────────┘

Legend:
● = Colored dot indicator
```

## Form States

### Input Field
```
Search Content
[_________________________________]
 ▲ Label
        ▲ Placeholder text
```

### Dropdown Select
```
Section
[All ▼]
 ▲ Label
    ▲ Current selection
      ▲ Dropdown indicator
```

## Keyboard States

### Focus State
```
Button: [Action]  ← Blue outline when focused
Input: [_______]  ← Ring effect around element
```

### Hover State
```
[Edit]        ← Slight color change, slight scale
[Delete]      ← Darker red, shadow effect
Card          ← Subtle shadow lift
```

## Message Indicators

### Save Confirmation (Implicit)
Item status changes from "Draft" to "Published"
Character count disappears
Edit buttons return

### Delete Confirmation (Recommended Future)
Could show: "Are you sure? This cannot be undone."

## Typography

```
Page Title:        text-3xl font-bold
Section Subtitle:  text-foreground/70
Card Title:        text-lg font-bold
Card Metadata:     text-sm text-foreground/60
Content Text:      text-foreground/70 text-sm
Button Text:       font-medium (medium weight)
Label Text:        text-sm font-medium
Character Count:   text-xs text-foreground/60
```

## Spacing System

```
Large Gaps:        p-8, mb-8, space-y-8
Medium Gaps:       p-6, mb-6, gap-4
Small Gaps:        p-4, mb-4, gap-2
Padding:           p-3, p-4
Radius:            rounded-md
```

## Card Structure

```
┌─ Card (Border + Light BG) ─────────────┐
│                                         │
│ ┌─ Header Section ─────────────────┐  │
│ │ Title        [Status] [Buttons]  │  │
│ │ Metadata                         │  │
│ └──────────────────────────────────┘  │
│                                         │
│ ┌─ Content Section ──────────────────┐ │
│ │ Content text or edit textarea      │ │
│ │ (Character count or update note)   │ │
│ └────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## Interactive States

### Button States
```
Default:    [Button]           ← Normal appearance
Hover:      [Button]           ← Slight color/shadow change
Active:     [Button]           ← Pressed appearance
Focus:      [Button] ◇         ← Blue outline
Disabled:   [Button]           ← Greyed out (future)
```

### Text Area States
```
Empty:      [              ]  ← Placeholder visible
Focused:    [█ |           ]  ← Blue outline, cursor visible
Filled:     [Content text ]  ← Content displayed
Error:      [Content text ]  ← Red outline (future)
```

## Navigation Context

The Content Management page is accessed via:
```
Dashboard Sidebar
├── Dashboard (📊)
├── Programs (📚)
├── Donations (💰)
├── Analytics (📈)
├── Content (📝) ← You are here
└── Settings (⚙️)
```

## Copy Examples

### Status Badges
```
Published   (Always green when shown)
Draft       (Always yellow when shown)
```

### Button Labels
```
Edit              - Enter edit mode
Save              - Commit changes and publish
Cancel            - Exit edit mode without saving
Publish           - Make draft public
Unpublish         - Hide from public
Delete            - Permanently remove
+ Add New Content - Create fresh item
```

### Labels
```
Search Content
Section
Status
Sort By
```

### Help Text
```
"Showing X of Y content items"
"Edit website content across different sections and manage publishing status"
"No content items found matching your filters."
```

## Accessibility Features

### Color Indicators (Not Only Color)
- Status badges have text labels + colors
- Buttons have text labels + icons

### Focus Visible
- All interactive elements have focus states
- Clear visual indication when tabbing

### Semantic HTML
- Proper labels for form inputs
- Heading hierarchy (h1, h2, h3)
- List structure for navigation

### Text Contrast
- Foreground/background combinations
- Minimum WCAG AA compliance
- Clear button text

---

This UI reference guide helps maintain visual consistency and provides development guidance for any future enhancements.
