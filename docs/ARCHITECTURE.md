# Survey System Architecture

## Overview
The survey/questionnaire system follows a clean separation of concerns with three distinct layers:

## Layer Structure

### 1. Data Access Layer (`src/lib/supabase.ts`)
**Responsibility**: Direct database interactions only

**Functions**:
- `fetchSurveyQuestions()` - Get questions for a survey
- `fetchQuestionOptions()` - Get options for multiple choice questions
- `getOrCreateSurveyAttempt()` - Find existing incomplete attempt or create new one
- `createSurveyAttempt()` - Create a new survey attempt
- `completeSurveyAttempt()` - Mark attempt as completed
- `saveResponse()` - Save/update a single response (uses upsert)
- `loadAttemptResponses()` - Load all responses for an attempt
- `getCurrentUserId()` - Get authenticated user ID

**Types**:
- `DbSurvey`, `DbQuestion`, `DbQuestionOption`
- `DbResponseInsert`, `DbSurveyAttempt`

**Rules**:
- ✅ Only database operations
- ✅ No business logic
- ✅ Returns raw data types
- ❌ No state management
- ❌ No UI concerns

### 2. Business Logic Layer (`src/hooks/useSurveyAttempt.ts`)
**Responsibility**: Survey attempt management and state

**Hook**: `useSurveyAttempt(surveyId, userId)`

**Returns**:
```typescript
{
  state: {
    attemptId: number | null
    surveyId: number
    questions: DbQuestion[]
    questionOptions: Record<number, DbQuestionOption[]>
    responses: Map<number, string>
    loading: boolean
    error: string | null
    currentQuestionIndex: number
    showSubmitButton: boolean
  },
  actions: {
    saveAnswer(questionId, value, optionId?)
    submitSurvey()
    setCurrentQuestionIndex(index)
    setShowSubmitButton(show)
  }
}
```

**Responsibilities**:
- Initialize survey attempt (get or create)
- Load questions and options
- Load existing responses
- Manage response state
- Handle save and submit operations
- Determine starting question

**Rules**:
- ✅ Business logic and state management
- ✅ Orchestrates data layer functions
- ✅ Framework-agnostic logic
- ❌ No direct UI rendering
- ❌ No styling or animations

### 3. Presentation Layer (`src/pages/DbQuestionnaire.tsx`)
**Responsibility**: UI rendering and user interactions

**Uses**:
- `useSurveyAttempt` hook for business logic
- Local state for UI-only concerns (animations, modals)

**State**:
- UI state: `isAnimating`, `pendingSelection`, `alertOpen`, etc.
- Auth state: `userId`, `authLoading`
- Computed values from hook state

**Responsibilities**:
- Render questions and options
- Handle user interactions
- Manage animations and transitions
- Display loading/error states
- Navigation and routing

**Rules**:
- ✅ UI rendering and styling
- ✅ User interaction handlers
- ✅ Animations and visual effects
- ❌ No direct database calls
- ❌ No business logic

## Data Flow

### Initialization
```
Component Mount
  ↓
Initialize Auth (getCurrentUserId)
  ↓
useSurveyAttempt Hook
  ↓
getOrCreateSurveyAttempt (finds incomplete or creates new)
  ↓
fetchSurveyQuestions + fetchQuestionOptions
  ↓
loadAttemptResponses (load existing answers)
  ↓
Calculate starting question
  ↓
Render UI
```

### Answering a Question
```
User Clicks Option
  ↓
Component: handleOptionClick
  ↓
Hook: saveAnswer(questionId, value, optionId)
  ↓
Data Layer: saveResponse (upsert to database)
  ↓
Hook: Update local state (responses Map)
  ↓
Component: Navigate to next question or show submit
```

### Submitting Survey
```
User Clicks Submit
  ↓
Component: handleSubmitSurvey
  ↓
Hook: submitSurvey()
  ↓
Data Layer: completeSurveyAttempt (set completed_at)
  ↓
Component: Navigate to results
```

## Key Design Decisions

### 1. Map vs Object for Responses
- **Choice**: Use `Map<number, string>` in the hook
- **Reason**: Better performance for lookups, clearer API
- **Conversion**: Convert to object only when needed for navigation state

### 2. Upsert for Responses
- **Choice**: Use Supabase `upsert()` instead of delete+insert
- **Reason**: Atomic operation, prevents race conditions and duplicate key errors
- **Benefit**: Users can change answers without conflicts

### 3. Get or Create Attempt
- **Choice**: Single function that finds incomplete or creates new
- **Reason**: Ensures users resume existing incomplete attempts
- **Benefit**: Prevents multiple incomplete attempts per user/survey

### 4. Custom Hook Pattern
- **Choice**: Extract business logic into `useSurveyAttempt`
- **Reason**: Separation of concerns, testability, reusability
- **Benefit**: Component focuses on presentation, logic is isolated

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear boundaries make changes easier
3. **Reusability**: Hook can be used in other components
4. **Scalability**: Easy to add features without affecting other layers
5. **Type Safety**: Strong TypeScript types throughout
6. **Performance**: Optimized data flow, minimal re-renders

## Future Improvements

- Add caching layer for questions/options
- Implement optimistic updates for better UX
- Add retry logic for failed saves
- Create a generic `useFormAttempt` hook for other forms
- Add analytics tracking at the hook level
