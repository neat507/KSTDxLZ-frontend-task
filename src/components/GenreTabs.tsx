"use client";

import React from "react";
import styled from "styled-components";

type GenreTab = "all" | "drama" | "romance";

interface GenreTabsProps {
  activeGenre: GenreTab;
  onGenreChange: (genre: GenreTab) => void;
}

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 30px;
    padding: 0 16px;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  border-radius: 25px;
  border: 1px solid #e2e8f0;
  background-color: ${({ $active }) => ($active ? "#3b82f6" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#64748b")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#3b82f6" : "#f1f5f9")};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
    min-width: 70px;
  }
`;

const tabs = [
  { key: "all" as const, label: "전체" },
  { key: "drama" as const, label: "드라마" },
  { key: "romance" as const, label: "로맨스" },
];

export default function GenreTabs({
  activeGenre,
  onGenreChange,
}: GenreTabsProps) {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          $active={activeGenre === tab.key}
          onClick={() => onGenreChange(tab.key)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
