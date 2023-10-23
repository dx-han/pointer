"use client";

export default function Note({ params }: { params: { noteid: string } }) {
  return <h1>{params.noteid}</h1>;
}
