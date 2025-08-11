import styled from "styled-components";
import { RankChange } from "./types";

export const RankingContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const RankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const RankingTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
    width: 100%;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "white"};
  color: ${({ $active, theme }) => ($active ? "white" : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 36px;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    padding: ${({ theme }) => theme.spacing.xs};
    min-height: 32px;
  }
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RankingItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RankColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  min-width: 60px;
  margin-right: ${({ theme }) => theme.spacing.md};
  position: relative;

  @media (max-width: 768px) {
    width: 50px;
    min-width: 50px;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RankNumber = styled.div<{ $rank: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: 4px;

  ${({ $rank, theme }) => {
    if ($rank <= 3) {
      const colors = {
        1: "#FFD700", // Gold
        2: "#C0C0C0", // Silver
        3: "#CD7F32", // Bronze
      };
      return `
        background: ${colors[$rank as keyof typeof colors]};
        color: white;
        border: 2px solid ${colors[$rank as keyof typeof colors]};
      `;
    }
    return `
      background: ${theme.colors.background};
      color: ${theme.colors.text};
      border: 2px solid ${theme.colors.border};
    `;
  }}

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    top: -6px;
    left: -6px;
  }
`;

export const RankChangeIndicator = styled.div<{
  $change: RankChange;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  font-size: 10px;
  font-weight: 500;
  min-width: 20px;
  height: 16px;
  border-radius: 8px;
  padding: 0 4px;

  ${({ $change, theme }) => {
    switch ($change) {
      case "up":
        return `
          color: white;
          background: #10B981;
        `;
      case "down":
        return `
          color: white;
          background: #EF4444;
        `;
      case "same":
        return `
          color: ${theme.colors.secondary};
          background: ${theme.colors.background};
          border: 1px solid ${theme.colors.border};
        `;
      case "new":
        return `
          color: white;
          background: #8B5CF6;
          font-size: 8px;
          font-weight: 700;
        `;
      default:
        return "";
    }
  }}
`;

export const ItemImage = styled.img`
  width: 65px;
  height: 87px;
  min-width: 65px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    width: 52px;
    height: 69px;
    min-width: 52px;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

export const ItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;

export const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const ItemAuthor = styled.span`
  font-weight: 500;
`;

export const ItemGenre = styled.span`
  padding: 2px 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 11px;
  font-weight: 500;
`;

export const SerialInfo = styled.span`
  padding: 2px 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 11px;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

export const ScrollContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};

  /* Hide scrollbar UI */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    /* Chrome, Safari and Opera */
    display: none;
  }
`;
