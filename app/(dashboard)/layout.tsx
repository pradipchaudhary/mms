"use client";

import { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardView({ children }: DashboardLayoutProps) {


  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}