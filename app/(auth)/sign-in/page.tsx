"use client";

import { useEffect, useState } from "react";

import { useSignInModal } from "./_hooks/use-sign-in-modal";

import { SignInModal } from "./_components/sign-in-modal";

export default function AuthSignInPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen, onOpen, onClose } = useSignInModal();

  useEffect(() => {
    setIsMounted(true);

    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (!isMounted) {
    return null;
  }

  return <SignInModal isOpen={isOpen} onClose={onClose} />;
}
