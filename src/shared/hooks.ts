import { SetStateAction, useEffect, useRef, useState } from 'react';


type Callback<T> = (value: T) => void;
export type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;


export const useStateWithCallback = <T>(initialState: T | (() => T)): [T, DispatchWithCallback<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<Callback<T>>();

  const setStateCallback = (newState: SetStateAction<T>, callback: Callback<T> = () => null): void => {
    callbackRef.current = callback;
    setState(newState);
  };

  useEffect(() => {
    callbackRef.current?.(state);
    callbackRef.current = undefined;
  }, [state]);

  return [state, setStateCallback];
};
