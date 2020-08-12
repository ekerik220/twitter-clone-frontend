import React from "react";
import { PageOne } from "./PageOne";
import { useSelector } from "react-redux";
import { PageTwo } from "./PageTwo";

export function CreateListModal() {
  // redux state
  const page = useSelector((state: RootState) => state.listModal.page);

  if (page === 1) return <PageOne />;
  if (page === 2) return <PageTwo />;
  return null;
}
