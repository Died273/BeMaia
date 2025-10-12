import React, { createContext, useContext, useState, ReactNode } from "react";

type ContactModalContextType = {
  show: boolean;
  email: string | null;
  openModal: (email: string) => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const openModal = (email: string) => {
    setEmail(email);
    setShow(true);
  };
  const closeModal = () => setShow(false);

  return (
    <ContactModalContext.Provider value={{ show, email, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}
