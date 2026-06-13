import React, { createContext, useContext, useEffect, useState } from "react";

type Item = { type: string; props: any };

export class SoeClient {
  ssr = false;
  items = new Map<string, Item>();
  listeners = new Set<() => void>();

  register(name: string, type: string, props: any) {
    this.items.set(name, { type, props });
    this.notify();
  }

  unregister(name: string) {
    this.items.delete(name);
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getItems() {
    return Array.from(this.items.entries()).map(([key, { type, props }]) => {
      return {
        id: key,
        type,
        props,
      };
    });
  }
}

export class SoeSSRClient extends SoeClient {
  ssr = true;
}

export const SoeContext = createContext<SoeClient | null>(null);

export const SoeProvider = ({
  client,
  children,
}: {
  client?: SoeClient;
  children: React.ReactNode;
}) => {
  if (!client) {
    client = new SoeClient();
  }
  return <SoeContext.Provider value={client}>{children}</SoeContext.Provider>;
};

export const useSeoContext = (): SoeClient => {
  const value = useContext(SoeContext);
  if (!value) throw new Error("useSEOContext requires SEOProvider");
  return value;
};
