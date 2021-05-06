import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMousePosition } from "../hooks/useMousePosition";
import image from "../assets/image.jpg";
import { gsap } from "gsap";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f5f5f5;

  h1 {
    margin: 0;
  }

  img {
    width: 100px;
    height: 100px;
    cursor: grab;
  }
`;

const Main = () => {
  const { position } = useMousePosition();
  const imageRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  //animation
  const animation = () => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      x: position.x - imageRef.current.getBoundingClientRect().width / 2,
      y: position.y - imageRef.current.getBoundingClientRect().height,
      duration: 0,
    });
  };

  const mouseUpAnimation = () => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      x: imageRef.current.getBoundingClientRect().left + position.x * 0.05,
      y: imageRef.current.getBoundingClientRect().top + position.y * 0.05,
      duration: 3,
    });
  };

  useEffect(() => {
    if (dragging) {
      animation();
    } else {
      return;
    }
  }, [position]);

  return (
    <>
      <Container>
        <h1 draggable='true'>
          {position.x} {position.y}
        </h1>
        <img
          onDragStart={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onMouseUp={() => {
            setDragging(false);
            mouseUpAnimation();
          }}
          draggable
          ref={imageRef}
          src={image}
        ></img>
      </Container>
    </>
  );
};

export default Main;
