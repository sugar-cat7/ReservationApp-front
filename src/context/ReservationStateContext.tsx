import { createContext, useContext, Dispatch, useReducer, Reducer, useMemo } from 'react';

type State = {
  spaceId: number;
};

const initialState = {
  spaceId: 0,
};

type NewState = {
  spaceId: number;
};

type ActionType = {
  type: 'SELECT';
  spaceId: number;
};

const reducer: Reducer<NewState, ActionType> = (state, action) => {
  switch (action.type) {
    case 'SELECT':
      return { ...state, spaceId: action.spaceId };
  }
};

// export const SpaceConditionContext = createContext<State | Dispatch<ActionType>>(initialState);
export const SpaceConditionContext = createContext<{
  state: NewState;
  selectSpace: (id: number) => void;
}>({
  state: initialState,
  selectSpace: () => null,
});

// Context Object の Provider（提供側）コンポーネントを返す
const SpaceConditionProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 選んだスペースのIdを返す
  const selectSpace = (id: number) => dispatch({ type: 'SELECT', spaceId: id });

  const value = useMemo(
    () => ({
      state,
      selectSpace,
    }),
    [state],
  );

  return <SpaceConditionContext.Provider value={value} {...props} />;
};

// Context Object を子、孫コンポーネントから呼び出すための Custom Hook
export const useSpaceCondition = () => {
  const context = useContext(SpaceConditionContext);

  if (typeof context === 'undefined') {
    throw new Error('useSpaceCondition must be within a SpaceConditionProvider');
  }

  return context;
};

// 検索条件の state と更新のための action を提供するためのコンポーネント
export const ManagedSpaceConditionContext: React.FC = (props) => (
  <SpaceConditionProvider>{props.children}</SpaceConditionProvider>
);
