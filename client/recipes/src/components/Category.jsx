import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/american"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cuisine/japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  margin-right: 1rem;
  text-decoration: none;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  h4 {
    color: #333;
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
  }

  svg {
    color: #333;
    font-size: 2rem;
  }

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    background-color: #40555a;
    color: white;
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;

export default Category;
