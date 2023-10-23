"use client";
import Kk from "./kk";

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>sidebar</h1>
      <h1>mainpage</h1>
      {children}
      <Kk></Kk>
    </>
  );
}
