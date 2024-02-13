"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

interface childProps {
  children: React.ReactNode;
}

export function Providers({ children }: childProps) {
  return <Provider store={store}>{children}</Provider>;
}
