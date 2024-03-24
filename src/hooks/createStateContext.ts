import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useState,
} from 'react';

const createStateContext = <T>(defaultInitialValue: T) => {
  const context = createContext<
    [T, React.Dispatch<React.SetStateAction<T>>] | undefined
  >(undefined);
  const providerFactory = (props: any, children: ReactNode) =>
    createElement(context.Provider, props, children);

  const Provider = ({
    children,
    initialValue,
  }: {
    children?: React.ReactNode;
    initialValue?: T;
  }) => {
    const state = useState<T>(
      initialValue !== undefined ? initialValue : defaultInitialValue,
    );
    return providerFactory({ value: state }, children);
  };

  const useStateContext = () => {
    const state = useContext(context);
    if (state == null) {
      throw new Error(`useStateContext must be used inside a StateProvider.`);
    }
    return state;
  };

  return [useStateContext, Provider, context] as const;
};

export default createStateContext;
