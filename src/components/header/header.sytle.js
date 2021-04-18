import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 15vh;
  background: #333;
  padding-left: 2rem;
  padding-right: 2rem;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0.75rem;
    overflow: overlay;
  }
`;

export const Title = styled.div`
  text-transform: uppercase;
  color: #ffffff;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;
