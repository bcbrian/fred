import React, { useState, useEffect, useRef } from "react";
import shortid from "shortid";
import { useFirestore } from "../firebase/firestore";

import "./View.css";

function getRandomTopherGatesColor() {
  const h = Math.floor(Math.random() * 360);
  const s = "100%";
  const l = "60%";
  return "hsl(" + h + "," + s + "," + l + ")";
}
const bodyEl = document.querySelector("body");

const Balloon = ({ top, left, delay, tophergatesColor, id, removeMe }) => {
  const [className, setClassName] = useState("");
  const balloonContainerEl = useRef(null);
  useEffect(() => {
    setTimeout(() => setClassName("animate"), delay);
  }, [delay]);
  useEffect(() => {
    console.log("hi", balloonContainerEl.current);
    balloonContainerEl.current &&
      balloonContainerEl.current.addEventListener("transitionend", function() {
        console.log("Transition ended", id);
        removeMe(id);
      });
  }, [balloonContainerEl, removeMe, id]);
  return (
    <div
      ref={balloonContainerEl}
      className={`balloon-container ${className}`}
      style={{ top, left }}
    >
      <div className="balloon" style={{ backgroundColor: tophergatesColor }} />
      <div
        className="balloon-knot"
        style={{ borderBottom: "16px solid " + tophergatesColor }}
      />
    </div>
  );
};

// TODO: get rid of the ballons... memory leak...
function releaseMawbstersBalloons(origBalloons, setBalloons) {
  const balloons = [...origBalloons];

  for (let i = 1; i <= 10; i++) {
    const id = shortid.generate();
    balloons.push(
      <Balloon
        key={id}
        id={id}
        tophergatesColor={getRandomTopherGatesColor()}
        top={"calc(100% + " + Math.floor(Math.random() * 51) + "%)"}
        left={Math.floor(Math.random() * 101) + "%"}
        delay={Math.floor(Math.random() * 5000)}
      />
    );
  }

  return balloons;
}

export default function View() {
  const {
    documentSnapshots: actionBallonDS,
    collectionRef: actionBalloonCF
  } = useFirestore("actions", {
    where: ["type", "==", "balloons"]
  });

  const [balloons, setBalloons] = useState([]);
  useEffect(() => {
    actionBallonDS.forEach(function(doc) {
      setBalloons(releaseMawbstersBalloons(balloons, setBalloons));
      actionBalloonCF
        .doc(doc.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    });
  }, [actionBallonDS]);

  useEffect(() => {
    setBalloons(releaseMawbstersBalloons(balloons, setBalloons));
  }, []);

  console.log(balloons);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "none"
      }}
    >
      {balloons.map(Balloon =>
        React.cloneElement(Balloon, {
          removeMe: id => {
            requestAnimationFrame(() => {
              console.log("old => ", id, balloons);
              const newLoons = balloons.filter(balloon => balloon.key !== id);
              console.log("new => ", id, newLoons);
              setBalloons(newLoons);
            });
          }
        })
      )}
    </div>
  );
}
